import { sendMessage } from "./utils/awsFunctions.mjs";
import { CONFIG } from "./config.mjs";
import {
  fetchShopMetafields,
  fetchAllProducts,
  MutateVariantPriceOfProduct
} from "./utils/queryFunctions.mjs";
import {
  calculatePriceForAllProducts,
  validateRates,
} from "./utils/utilityFunctions.mjs";

const handler = async () => {
  try {
    // Fetch And Transform shop.custom.metafields
    const MetaFields = await fetchShopMetafields();

    // Validate Rates
    if (await validateRates(MetaFields)) {
      console.log(MetaFields)

      // Fetch all Products
      const Products = await fetchAllProducts();
      // Calculate Price of Each variant
      let PriceUpdatedProducts=calculatePriceForAllProducts(MetaFields,Products);
      console.log(JSON.stringify(PriceUpdatedProducts));
      await MutateVariantPriceOfProduct(PriceUpdatedProducts);
    }

    let RatesObj = {
      gold_22kt_rate: "9380.0",
      gold_24_kt_rates: "10233.0",
      gold_18kt_rates: "7675.0",
      gold_24kt_rate: "10233.0",
      gold_18kt_rate: "7675.0",
      silver_rate: "116.0",
      gold_labour_percentage: "8.0",
      silver_additional_labor: "50.0",
      gold_labor_percentage: "8.0",
      gold_lagdis_half_labor: "500.0",
      gold_lagdi_1g_labor: "1000.0",
      silver_lagdi_25g_labor: "150.0",
      silver_lagdi_5g_labor: "225.0",
      silver_lagdi_10g_labor: "250.0",
    };
    let ProductObj = [
      {
        id: "gid://shopify/Product/8811865440419",
        title: "Ethereal Blossom Moissanite Ring – 925 Sterling Silver",
        metafields: {
          metal_type: "Silver",
          purity: "95",
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/46032897441955",
                title: "5",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 45,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46032897474723",
                title: "6",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 45,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46032897507491",
                title: "7",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 45,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46032897540259",
                title: "8",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 45,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46032897573027",
                title: "9",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 45,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: "gid://shopify/Product/8827311620259",
        title: "Floral Diamond Forming Gold Bangle",
        metafields: {
          metal_type: "Gold_22KT",
          stone_charges: "1000",
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/46104920031395",
                title: "10",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 1,
                      unit: "KILOGRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46104920064163",
                title: "12",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 2,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46104920096931",
                title: "14",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 3,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46104920129699",
                title: "15",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 4,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: "gid://shopify/Product/8840624210083",
        title: "24K Gold Coin",
        metafields: {
          metal_type: "Gold_Coins",
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/46168255168675",
                title: "5 GRAM",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 0.5,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46168255201443",
                title: "10 GRAM",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 10,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
          ],
        },
      },

      {
        id: "gid://shopify/Product/8840624210083",
        title: "Silver Coin",
        metafields: {
          metal_type: "Silver_Coins",
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/46168255168675",
                title: "2.5 GRAM",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 2.5,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46168255201443",
                title: "5 GRAM",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 5,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/46168255201444",
                title: "10 GRAM",
                inventoryItem: {
                  measurement: {
                    weight: {
                      value: 10,
                      unit: "GRAMS",
                    },
                  },
                },
              },
            },
          ],
        },
      },
    ];

    // let PriceUpdatedObj=calculatePriceForAllProducts(RatesObj,ProductObj);
    // console.log(JSON.stringify(PriceUpdatedObj));


    // Assume you already have products = await fetchAllProducts();
    // And MetaFields -> contains the rates object

    // for (const product of ProductObj) {
    //   console.log("working");
    //   // Loop through each variant of the product
    //   product.variants.edges.forEach((variant, index) => {
    //     try {
    //       // Call your calculation function
    //       const newPrice = calculatePriceBasedOnMetalType(
    //         RatesObj,
    //         product,
    //         index
    //       );

    //       console.log(
    //         `✅ Product: ${product.title}, Variant: ${variant.title}, New Price: ${newPrice}`
    //       );

    //       // (Optional) If you want to attach it back to product object
    //       // product.variants[index].calculatedPrice = newPrice;

    //       // (Later you can build mutation query to update variant price)
    //     } catch (err) {
    //       console.error(
    //         `❌ Error calculating for ${product.title} - ${variant.title}:`,
    //         err
    //       );
    //     }
    //   });
    // }
  } catch (err) {}
  // const test = await sendMessage("123", "abc");
  // console.log(JSON.stringify(test));
};

// Local test
if (CONFIG.CONSTANTS.ENV === "LOCAL") {
  handler().then(console.log).catch(console.error);
}
