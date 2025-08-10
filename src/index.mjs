import dotenv from 'dotenv';
import { shopifyApi } from '@shopify/shopify-api';

dotenv.config();

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      dotenvWorking: !!process.env,
      shopifyApiImported: typeof shopifyApi === 'function'
    })
  };
};
