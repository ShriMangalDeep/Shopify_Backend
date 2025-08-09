// src/utils/priceCalculator.js
function calculatePrice({ metalType, weight, makingCharges, rates, gstRate }) {
  const rate = rates[metalType] || 0;
  const base = weight * rate;
  const making = makingCharges || (base * (rates.laborPercentage / 100));
  const gst = base * (gstRate / 100);
  return base + making + gst;
}

module.exports = { calculatePrice };
