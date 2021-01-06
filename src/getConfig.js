module.exports = function getConfig() {
  return {
    productId: parseInt(process.env.PRODUCT_ID),
    vendorId: parseInt(process.env.VENDOR_ID),
  };
};
