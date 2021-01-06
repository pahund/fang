const usb = require("usb");
const getConfig = require("./getConfig");
const getDevice = require("./getDevice");

const { productId, vendorId } = getConfig();

const device = getDevice(vendorId, productId);

if (!device) {
  console.error("Fang not found, are you sure it's connected?");
  process.exit(1);
}

console.log(`[PH_LOG] device\n${JSON.stringify(device, null, 4)}`); // PH_TODO

