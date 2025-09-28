import { MobilyEnvironment, MobilyPurchaseSDK } from 'mobilyflow-react-native-sdk';

export class MobilyFlowService {
  private static sdk: MobilyPurchaseSDK;

  public static getSDK() {
    if (!this.sdk) {
      // TODO: Use a real environment variable
      const env = {
        MOBILYFLOW_APP_ID: 'caecc000-45ce-49b3-b218-46c1d985ae85',
        MOBILYFLOW_API_KEY: '7aa18f9720a5c9731d17f5c54e89bdd218647f71269eed2f6c27c8fa5924da84',
        MOBILYFLOW_ENVIRONMENT: MobilyEnvironment.DEVELOPMENT,
      };

      this.sdk = new MobilyPurchaseSDK(env.MOBILYFLOW_APP_ID, env.MOBILYFLOW_API_KEY, env.MOBILYFLOW_ENVIRONMENT, {
        debug: true,
        // apiURL: 'https://mobilyflow.eu-1.sharedwithexpose.com/v1',
      });
    }
    return this.sdk;
  }
}
