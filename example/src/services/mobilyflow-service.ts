import { MobilyCustomer, MobilyEnvironment, MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';
import { MMKV } from 'react-native-mmkv';
import { Listener as MMKVListener } from 'react-native-mmkv/lib/typescript/src/Types';
import { useMobilyflowStore } from '../stores/mobilyflow-store';
import { queryClient } from '../config/query-client';
import { MOBILYFLOW_API_KEY, MOBILYFLOW_APP_ID } from '../../env';

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

    this.customerId = this.storage.getString('customerId');
    this.apiURL = this.storage.getString('apiURL');
    this.environment = (this.storage.getString('environment') as MobilyEnvironment) ?? MobilyEnvironment.DEVELOPMENT;

    this.sdk = new MobilyPurchaseSDK(MOBILYFLOW_APP_ID, MOBILYFLOW_API_KEY, this.environment, {
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
        console.log(`Login with customerId = ${customer.id} (externalRef = ${customer.externalRef})`);
        await queryClient.invalidateQueries({ queryKey: ['mobilyflow'] });
        for (const listener of this.customerListeners) {
          listener(customer);
        }
      }
    } catch (error: any) {
      console.error('Login error = ', error);
      useMobilyflowStore.setState({ isLoading: false, error });
    }
  }

  private static onParamsChange = async (key: string) => {
    if (key === 'customerId') {
      await this.setCustomerId(this.storage.getString('customerId'));
    } else if (key === 'apiURL') {
      await this.setApiURL(this.storage.getString('apiURL'));
    } else if (key === 'environment') {
      await this.setEnvironment(this.storage.getString('environment') as MobilyEnvironment);
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
