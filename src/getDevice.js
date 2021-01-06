const usb = require("usb");

module.exports = function getDevice(vendorId, productId){
  return usb
    .getDeviceList()
    .find(({ deviceDescriptor: { idVendor, idProduct } }) => idVendor === vendorId && idProduct === productId);
}
