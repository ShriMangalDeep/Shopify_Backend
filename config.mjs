import dotenv from "dotenv";
dotenv.config(); // only once, inside config

export const CONFIG = {
  SHOPIFY: {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_STORE: process.env.SHOPIFY_STORE,
    SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
    SHOPIFY_HOSTNAME: "localhost:3000",
  },
  AWS: {
    SNS_REGION: "eu-north-1",
    SNS_TOPIC_ARN: "arn:aws:sns:eu-north-1:353563799102:Notify_Mangaldeep",
  },
  CONSTANTS: {
    ENV: "LOCAL",

    // Gold rates
    GOLD_22KT_RATE: "gold_22kt_rate",
    GOLD_24KT_RATE: "gold_24kt_rate",
    GOLD_18KT_RATE: "gold_18kt_rate",

    // Silver rates
    SILVER_RATE: "silver_rate",

    // Labour percentages
    GOLD_LABOUR_PERCENTAGE: "gold_labor_percentage",
    SILVER_ADDITIONAL_LABOR: "silver_additional_labor",

    // Gold lagdi labors
    GOLD_LAGDIS_HALF_LABOR: "gold_lagdis_half_labor",
    GOLD_LAGDI_1G_LABOR: "gold_lagdi_1g_labor",

    // Silver lagdi labors
    SILVER_LAGDI_25G_LABOR: "silver_lagdi_25g_labor",
    SILVER_LAGDI_5G_LABOR: "silver_lagdi_5g_labor",
    SILVER_LAGDI_10G_LABOR: "silver_lagdi_10g_labor",
  },
  ERROR: [],
};

export const pushNewError = (Title, Message) => {
  CONFIG.ERROR.push(`${Title}} : ${Message}`);
  if (CONFIG.CONSTANTS.ENV === "LOCAL") {
    console.error(`${Title} : ${Message}`);
  }
};
