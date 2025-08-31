import { CONFIG } from "../config.mjs";
import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { sendMessage } from "./awsFunctions.mjs";

// Initialize Shopify API
const shopify = shopifyApi({
  apiKey: CONFIG.SHOPIFY.SHOPIFY_API_KEY,
  apiSecretKey: CONFIG.SHOPIFY.SHOPIFY_API_SECRET,
  hostName: CONFIG.SHOPIFY.SHOPIFY_HOSTNAME,
  apiVersion: LATEST_API_VERSION,
});

const session = {
  shop: CONFIG.SHOPIFY.SHOPIFY_STORE,
  accessToken: CONFIG.SHOPIFY.SHOPIFY_ACCESS_TOKEN,
};

export async function fetchShopMetafields() {
  const GET_SHOP_METAFIELDS_QUERY = `
    {
      shop {
        metafields(first: 100, namespace: "custom") {
          edges {
            node {
              key
              value
            }
          }
        }
      }
    }
  `;

  try {
    // Use shopify.clients.Graphql instead of shopify.api.clients.Graphql
    const client = new shopify.clients.Graphql({ session });
    const response = await client.query({ data: GET_SHOP_METAFIELDS_QUERY });
    const ratesObj = response.body.data.shop.metafields.edges.reduce(
      (acc, edge) => {
        acc[edge.node.key] = edge.node.value;
        return acc;
      },
      {}
    );
    return ratesObj;
  } catch (error) {
    console.error("Error fetching shop metafields:", error);
  }
}

// Small sleep helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAllProducts() {
  let products = [];
  let hasNextPage = true;
  let cursor = null;

  function transformProducts(products) {
    return products.map((product) => {
      // --- Metafields ---
      const metafields = {};
      if (product.metafields?.edges) {
        product.metafields.edges.forEach(({ node }) => {
          metafields[node.key] = node.value;
        });
      }

      return {
        ...product,
        metafields,
      };
    });
  }

  while (hasNextPage) {
    const query = `
      query fetchProducts($cursor: String) {
        products(first: 100, after: $cursor) {
          edges {
            cursor
            node {
              id
              title

              metafields(first: 20, namespace: "custom") {
                edges {
                  node {
                    key
                    value
                  }
                }
              }

              variants(first: 20) {
                edges {
                  node {
                    id
                    title
                    inventoryItem {
                      measurement {
                        weight {
                          value
                          unit
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    try {
      const client = new shopify.clients.Graphql({ session });
      const response = await client.query({
        data: { query, variables: { cursor } },
      });

      const edges = response.body.data.products.edges;
      products.push(...edges.map((edge) => edge.node));

      hasNextPage = response.body.data.products.pageInfo.hasNextPage;
      cursor = response.body.data.products.pageInfo.endCursor;

      // Rate limit handling
      const cost = response.body.extensions?.cost;
      if (cost && cost.throttleStatus.currentlyAvailable < 100) {
        console.log("Low credits, pausing 2s...");
        await sleep(2000);
      }
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.body?.errors || error
      );
      await sendMessage("Product Fetch Error", JSON.stringify(error));
      break;
    }
  }

  return transformProducts(products);
}
export const MutateVariantPriceOfProduct = async (products) => {
  const client = new shopify.clients.Graphql({ session });

  for (const product of products) {
    console.log(`⚙️ Working on product: ${product.title}`);

    // Collect variants with updatedPrice
    const variantsToUpdate = product.variants.edges
      .map(edge => edge.node)
      .filter(variant => variant.updatedPrice)
      .map(variant => ({
        id: variant.id,
        price: variant.updatedPrice.toString(),
      }));

    if (variantsToUpdate.length === 0) {
      console.log(`ℹ️ No variants with updatedPrice for ${product.title}, skipping.`);
      continue;
    }

    const mutation = `
      mutation productVariantsBulkUpdate(
        $productId: ID!,
        $variants: [ProductVariantsBulkInput!]!
      ) {
        productVariantsBulkUpdate(
          productId: $productId,
          variants: $variants,
          allowPartialUpdates: true
        ) {
          productVariants {
            id
            price
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const response = await client.query({
        data: {
          query: mutation,
          variables: {
            productId: product.id,
            variants: variantsToUpdate,
          },
        },
      });

      const result = response.body.data.productVariantsBulkUpdate;
      console.log(`🚀 Batch updated variants for ${product.title}`);
      console.log(JSON.stringify(result, null, 2));

      // --- Rate limiting ---
      const costInfo = response.body.extensions?.cost?.throttleStatus;
      if (costInfo) {
        const { currentlyAvailable, restoreRate } = costInfo;
        console.log(
          `💰 Remaining points: ${currentlyAvailable}, Restore rate: ${restoreRate}/s`
        );

        if (currentlyAvailable < 100) {
          const waitMs = Math.ceil(
            ((100 - currentlyAvailable) / restoreRate) * 1000
          );
          console.log(`⏳ Waiting ${waitMs}ms for throttle reset...`);
          await new Promise((r) => setTimeout(r, waitMs));
        }
      }
    } catch (err) {
      console.error(`❌ Error updating variants for ${product.title}:`, err);
    }
  }
};
