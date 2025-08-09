// src/handlers/updatePrices.js
const { updatePrices } = require('../services/shopifyService');

exports.handler = async (event) => {
  try {
    const result = await updatePrices();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    console.error('Error updating prices:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
