import { CONFIG, pushNewError } from "../config.mjs";
import { sendMessage } from "../utils/awsFunctions.mjs";
[
  {
    id: "",
    title: "",
    metafields: {
      metal_type: "",
      purity: "",
      making_charges: "",
      // Similary all metafields should like this key-value pair
    },
    variants: [
      {
        id: "",
        title: "",
        weight: "",
        unit: "",
      },
      // similarly all variants should be present
    ],
  },
];
let productItems = [
  {
    id: "gid://shopify/Product/8811865440419",
    title: "Ethereal Blossom Moissanite Ring – 925 Sterling Silver",
    metafields: {
      edges: [
        {
          node: {
            key: "metal_type",
            value: "Silver",
          },
        },
        {
          node: {
            key: "purity",
            value: "95",
          },
        },
        {
          node: {
            key: "making_charges",
            value: "200.0",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/46032897441955",
            title: "5",
            price: "2000.00",
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
            price: "2006.00",
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
            price: "2007.00",
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
            price: "2008.00",
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
            price: "2009.00",
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
      edges: [
        {
          node: {
            key: "metal_type",
            value: "Gold_22KT",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/46104920031395",
            title: "10",
            price: "10000.00",
            inventoryItem: {
              measurement: {
                weight: {
                  value: 1,
                  unit: "GRAMS",
                },
              },
            },
          },
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/46104920064163",
            title: "12",
            price: "120000.00",
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
            price: "140000.00",
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
            price: "150000.00",
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
];

export const validateRates = async (data) => {
  const errors = [];
  const C = CONFIG.CONSTANTS; // shorthand

  // Gold rates validation
  if (
    !data[C.GOLD_22KT_RATE] ||
    isNaN(data[C.GOLD_22KT_RATE]) ||
    data[C.GOLD_22KT_RATE] <= 0 ||
    data[C.GOLD_22KT_RATE] > 20000
  ) {
    errors.push(`Invalid ${C.GOLD_22KT_RATE}: must be between 1 and 20000.`);
  }

  if (
    !data[C.GOLD_24KT_RATE] ||
    isNaN(data[C.GOLD_24KT_RATE]) ||
    data[C.GOLD_24KT_RATE] <= 0 ||
    data[C.GOLD_24KT_RATE] > 20000
  ) {
    errors.push(`Invalid ${C.GOLD_24KT_RATE}: must be between 1 and 20000.`);
  }

  if (
    !data[C.GOLD_18KT_RATE] ||
    isNaN(data[C.GOLD_18KT_RATE]) ||
    data[C.GOLD_18KT_RATE] <= 0 ||
    data[C.GOLD_18KT_RATE] > 20000
  ) {
    errors.push(`Invalid ${C.GOLD_18KT_RATE}: must be between 1 and 20000.`);
  }

  // Silver rate validation
  if (
    !data[C.SILVER_RATE] ||
    isNaN(data[C.SILVER_RATE]) ||
    data[C.SILVER_RATE] <= 0 ||
    data[C.SILVER_RATE] > 2000
  ) {
    errors.push(`Invalid ${C.SILVER_RATE}: must be between 1 and 2000.`);
  }

  // Labour percentages
  if (
    isNaN(data[C.GOLD_LABOUR_PERCENTAGE]) ||
    data[C.GOLD_LABOUR_PERCENTAGE] < 0 ||
    data[C.GOLD_LABOUR_PERCENTAGE] > 100
  ) {
    errors.push(
      `Invalid ${C.GOLD_LABOUR_PERCENTAGE}: must be between 0 and 100.`
    );
  }

  if (
    isNaN(data[C.SILVER_ADDITIONAL_LABOR]) ||
    data[C.SILVER_ADDITIONAL_LABOR] < 0 ||
    data[C.SILVER_ADDITIONAL_LABOR] > 10000
  ) {
    errors.push(
      `Invalid ${C.SILVER_ADDITIONAL_LABOR}: must be between 0 and 10000.`
    );
  }

  // Gold lagdi labors
  if (
    isNaN(data[C.GOLD_LAGDIS_HALF_LABOR]) ||
    data[C.GOLD_LAGDIS_HALF_LABOR] < 0 ||
    data[C.GOLD_LAGDIS_HALF_LABOR] > 5000
  ) {
    errors.push(
      `Invalid ${C.GOLD_LAGDIS_HALF_LABOR}: must be between 0 and 5000.`
    );
  }

  if (
    isNaN(data[C.GOLD_LAGDI_1G_LABOR]) ||
    data[C.GOLD_LAGDI_1G_LABOR] < 0 ||
    data[C.GOLD_LAGDI_1G_LABOR] > 10000
  ) {
    errors.push(
      `Invalid ${C.GOLD_LAGDI_1G_LABOR}: must be between 0 and 10000.`
    );
  }

  // Silver lagdi labors
  if (
    isNaN(data[C.SILVER_LAGDI_25G_LABOR]) ||
    data[C.SILVER_LAGDI_25G_LABOR] < 0 ||
    data[C.SILVER_LAGDI_25G_LABOR] > 5000
  ) {
    errors.push(
      `Invalid ${C.SILVER_LAGDI_25G_LABOR}: must be between 0 and 5000.`
    );
  }

  if (
    isNaN(data[C.SILVER_LAGDI_5G_LABOR]) ||
    data[C.SILVER_LAGDI_5G_LABOR] < 0 ||
    data[C.SILVER_LAGDI_5G_LABOR] > 5000
  ) {
    errors.push(
      `Invalid ${C.SILVER_LAGDI_5G_LABOR}: must be between 0 and 5000.`
    );
  }

  if (
    isNaN(data[C.SILVER_LAGDI_10G_LABOR]) ||
    data[C.SILVER_LAGDI_10G_LABOR] < 0 ||
    data[C.SILVER_LAGDI_10G_LABOR] > 5000
  ) {
    errors.push(
      `Invalid ${C.SILVER_LAGDI_10G_LABOR}: must be between 0 and 5000.`
    );
  }

  if (errors.length > 0) {
    const errorMessage = errors.join("\n");
    await sendMessage("Rate Validation Errors", errorMessage);
    return false;
  }

  return true;
};

export const calculatePriceBasedOnMetalType = (
  ratesObj,
  productItemObj,
  variantIndex
) => {
  try {
    if (productItemObj.metafields.metal_type) {
      let CONSTANTS = CONFIG.CONSTANTS;
      let weight = Number(
        productItemObj.variants.edges[variantIndex].node.inventoryItem
          .measurement.weight.value
      );
      let weightUnit =
        productItemObj.variants.edges[variantIndex].node.inventoryItem
          .measurement.weight.unit;

      // convert weight into grams
      if (weightUnit === "KILOGRAMS") {
        weight = weight * 1000;
      }

      // Check If MetalType Is Gold_Coins
      if (productItemObj.metafields.metal_type === "Gold_Coins") {
        let Gold_24KT_Rate = Number(ratesObj[CONSTANTS.GOLD_24KT_RATE]);
        let DynamicMakingCharge = Number(
          weight === 0.5
            ? ratesObj[CONSTANTS.GOLD_LAGDIS_HALF_LABOR]
            : ratesObj[CONSTANTS.GOLD_LAGDI_1G_LABOR]
        );
        let MakingCharges = productItemObj.metafields.making_charges
          ? Number(productItemObj.metafields.making_charges)
          : DynamicMakingCharge;
        return Gold_24KT_Rate * weight + MakingCharges;
      }

      // Check if it is Silver Coin
      else if (productItemObj.metafields.metal_type === "Silver_Coins") {
        let Silver_Rate = Number(ratesObj[CONSTANTS.SILVER_RATE]);
        let DynamicMakingCharge = Number(
          weight < 5
            ? ratesObj[CONSTANTS.SILVER_LAGDI_25G_LABOR]
            : weight > 5
            ? ratesObj[CONSTANTS.SILVER_LAGDI_10G_LABOR]
            : ratesObj[CONSTANTS.SILVER_LAGDI_5G_LABOR]
        );
        let MakingCharges = productItemObj.metafields.making_charges
          ? Number(productItemObj.metafields.making_charges)
          : DynamicMakingCharge;
        return Silver_Rate * weight + MakingCharges;
      }

      // Check if its Silver
      else if (productItemObj.metafields.metal_type === "Silver") {
        let Silver_Rate = Number(ratesObj[CONSTANTS.SILVER_RATE]);
        let Stone_Charges =
          Number(productItemObj.metafields.stone_charges) || 0;
        let DynamicMakingCharge =
          (Number(ratesObj[CONSTANTS.SILVER_ADDITIONAL_LABOR]) + Silver_Rate) *
          weight;
        let MakingCharges = productItemObj.metafields.making_charges
          ? Number(productItemObj.metafields.making_charges)
          : DynamicMakingCharge;
        return (Silver_Rate * weight) + MakingCharges + Stone_Charges;
      }

      // Check if it is Gold
      else if (
        productItemObj.metafields.metal_type.toLowerCase().includes("gold")
      ) {
        let Gold_24KT_Rate = Number(ratesObj[CONSTANTS.GOLD_24KT_RATE]);
        let Stone_Charges =
          Number(productItemObj.metafields.stone_charges) || 0;
        let Gold_Rate = 0;
        if (productItemObj.metafields.metal_type === "Gold_22KT") {
          Gold_Rate = Number(ratesObj[CONSTANTS.GOLD_22KT_RATE]);
        } else if (productItemObj.metafields.metal_type === "Gold_18KT") {
          Gold_Rate = Number(ratesObj[CONSTANTS.GOLD_18KT_RATE]);
        } else if (productItemObj.metafields.metal_type === "Gold_24KT") {
          Gold_Rate = Number(ratesObj[CONSTANTS.GOLD_24KT_RATE]);
        } else {
          pushNewError(
            "Product MetaFields Error",
            `Metal_Type for Product : ${productItemObj.title} with ID : ${productItemObj.id} Is not valid, we got ${productItemObj.metafields.metal_type} !`
          );
          return undefined;
        }

        let DynamicMakingCharge =
          (Number(ratesObj[CONSTANTS.GOLD_LABOUR_PERCENTAGE]) / 100) *
          weight *
          Gold_24KT_Rate;
        let MakingCharges = productItemObj.metafields.making_charges
          ? Number(productItemObj.metafields.making_charges)
          : DynamicMakingCharge;

        return Gold_Rate * weight + MakingCharges + Stone_Charges;
      } else {
        pushNewError(
          "Product MetaFields Error",
          `Metal_Type for Product : ${productItemObj.title} with ID : ${productItemObj.id} Is not valid, we got ${productItemObj.metafields.metal_type} !`
        );
        return undefined;
      }
    } else {
      pushNewError(
        "Product MetaFields Error",
        `Metal_Type for Product : ${productItemObj.title} with ID : ${productItemObj.id} Not Defined !`
      );
      return undefined;
    }
  } catch (err) {
     pushNewError(
        "Product Variant Price Calculation Error",
        `Error In Calculating Price for Product : ${productItemObj.title} with ID : ${productItemObj.id}. Error : ${JSON.stringify(err)}`
      );
      return undefined;
  }
};

export const calculatePriceForAllProducts=(RatesObj,ProductObj)=>{
      for (const product of ProductObj) {
      // Loop through each variant of the product
      product.variants.edges.forEach((variant, index) => {
        try {
          // Call your calculation function
          const newPrice = calculatePriceBasedOnMetalType(
            RatesObj,
            product,
            index
          );

          console.log(
            `✅ Product: ${product.title}, Variant: ${variant.title}, New Price: ${newPrice}`
          );
          if(newPrice && newPrice!=undefined){
            product.variants.edges[index].node.updatedPrice = newPrice;
          }

        } catch (err) {
          console.error(
            `❌ Error calculating for ${product.title} - ${variant.title}:`,
            err
          );
        }
      });
    }
    return ProductObj;
}