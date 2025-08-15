import dotenv from 'dotenv';
import { shopifyApi } from '@shopify/shopify-api';

dotenv.config();

export const handler = async () => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      dotenvWorking: !!process.env,
      shopifyApiImported: typeof shopifyApi === 'function'
    })
  };
};

// Local test
if (process.env.ENV === 'LOCAL') {
  handler({ test: true }).then(console.log).catch(console.error);
}
