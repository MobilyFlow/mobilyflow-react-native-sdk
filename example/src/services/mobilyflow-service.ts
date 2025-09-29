import { MobilyCustomer, MobilyEnvironment, MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';
import { MMKV } from 'react-native-mmkv';
import { Listener as MMKVListener } from 'react-native-mmkv/lib/typescript/src/Types';

export class MobilyFlowService {
  private static sdk: MobilyPurchaseSDK;
  private static storage = new MMKV({ id: 'mobilyflow' });
  private static storageListener: MMKVListener;

  private static customerId: string;
  private static apiURL: string;
  private static environment: MobilyEnvironment;

  private static customerListeners: ((customer: MobilyCustomer) => void)[] = [];

  public static init() {
    this.destroy();

    // TODO: Use real env
    const env = {
      MOBILYFLOW_APP_ID: 'caecc000-45ce-49b3-b218-46c1d985ae85',
      MOBILYFLOW_API_KEY: '7aa18f9720a5c9731d17f5c54e89bdd218647f71269eed2f6c27c8fa5924da84',
    };

    this.customerId = this.storage.getString('customerId');
    this.apiURL = this.storage.getString('apiURL');
    this.environment = (this.storage.getNumber('environment') as MobilyEnvironment) ?? MobilyEnvironment.DEVELOPMENT;

    this.sdk = new MobilyPurchaseSDK(env.MOBILYFLOW_APP_ID, env.MOBILYFLOW_API_KEY, this.environment, {
      apiURL: this.apiURL,
      debug: true,
    });

    this.storageListener = this.storage.addOnValueChangedListener(this.onParamsChange);

    return this.sdk;
  }

  public static destroy() {
    if (this.storageListener) {
      this.storageListener.remove();
    }
    if (this.sdk) {
      this.sdk.close();
    }
  }

  public static getSDK() {
    if (!this.sdk) {
      this.init();
    }
    return this.sdk;
  }

  public static addCustomerChangeListener(listener: (customer: MobilyCustomer) => void) {
    this.customerListeners.push(listener);
  }

  public static async login() {
    try {
      if (this.customerId) {
        const customer = await this.getSDK().login(this.customerId);
        for (const listener of this.customerListeners) {
          listener(customer);
        }
      }
    } catch (e: any) {
      console.error('Error logging in', e);
    }
  }

  private static onParamsChange = async (key: string) => {
    if (key === 'customerId') {
      await this.setCustomerId(this.storage.getString('customerId'));
    } else if (key === 'apiURL') {
      await this.setApiURL(this.storage.getString('apiURL'));
    } else if (key === 'environment') {
      await this.setEnvironment(this.storage.getNumber('environment') as MobilyEnvironment);
    }
  };

  public static setCustomerId = async (customerId: string) => {
    if (this.customerId === customerId) {
      return;
    }
    this.customerId = customerId;
    this.storage.set('customerId', customerId);
    await this.login();
  };

  public static setApiURL = async (apiURL: string) => {
    if (this.apiURL === apiURL) {
      return;
    }

    this.apiURL = apiURL;
    this.storage.set('apiURL', apiURL);

    this.init();
    await this.login();
  };

  public static setEnvironment = async (environment: MobilyEnvironment) => {
    if (this.environment === environment) {
      return;
    }

    this.environment = environment ?? MobilyEnvironment.DEVELOPMENT;
    this.storage.set('environment', environment);

    this.init();
    await this.login();
  };
}
