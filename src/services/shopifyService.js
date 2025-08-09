// src/services/shopifyService.js
const { SHOPIFY_STORE, SHOPIFY_ACCESS_TOKEN } = require('../config');
const { calculatePrice } = require('../utils/priceCalculator');

async function updatePrices() {
  const products = await fetchProducts();
  const updates = products.map(product => {
    const newPrice = calculatePrice(product);
    return updateProductPrice(product.id, newPrice);
  });
  return Promise.all(updates);
}

async function fetchProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            metafields(first: 10) { edges { node { namespace key value } } }
          }
        }
      }
    }
  `;
  return callShopify(query);
}

async function updateProductPrice(productId, price) {
  const mutation = `
    mutation productVariantUpdate($input: ProductVariantInput!) {
      productVariantUpdate(input: $input) {
        productVariant { id price }
        userErrors { field message }
      }
    }
  `;
  return callShopify(mutation, { input: { id: productId, price: String(price) } });
}

async function callShopify(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await response.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

module.exports = { updatePrices };
