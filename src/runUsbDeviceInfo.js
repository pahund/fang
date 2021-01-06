const { promisify } = require("util");
const usb = require("usb");
const getConfig = require("./getConfig");
const getTransferTypeDescription = require("./getTransferTypeDescription");

(async () => {
  const { productId, vendorId } = getConfig();
  console.log(`Product ID: ${productId}`);
  console.log(`Vendor ID: ${vendorId}`);

  const fang = usb.findByIds(vendorId, productId);

  if (!fang) {
    console.error("Fang not found, are you sure it's connected?");
    process.exit(1);
  }

  fang.open();

  const getStringDescriptor = promisify(fang.getStringDescriptor).bind(fang);
  const getCapabilities = promisify(fang.getCapabilities).bind(fang);

  try {
    console.log(`Descriptor 1: ${await getStringDescriptor(1)}`);
    console.log(`Descriptor 2: ${await getStringDescriptor(2)}`);
  } catch (err) {
    console.error("Error trying to get descriptor");
    console.log(err);
    process.exit(1);
  }

  // if you uncomment this the script will run until the Fang is detached
  /*
  usb.on("detach", (fang) => {
    console.error("Fang was detached");
    process.exit(1);
  });
   */

  console.log(
    `Fang has ${fang.interfaces.length} interface${
      fang.interfaces.length === 1 ? "" : "s"
    }`
  );

  let capabilities;
  try {
    capabilities = await getCapabilities();
  } catch (err) {
    console.error("Error getting capabilities");
    console.log(err);
    process.exit(1);
  }
  console.log(`Fang has ${capabilities.length} capabilities`);

  for (let i = 0; i < fang.interfaces.length; i++) {
    const interfce = fang.interface(i);
    console.log(
      `Kernel driver of interface ${i + 1} is ${
        interfce.isKernelDriverActive() ? "" : "not "
      }active`
    );
    console.log(
      `Interface ${i + 1} has ${interfce.endpoints.length} endpoint${
        interfce.endpoints.length === 1 ? "" : "s"
      }`
    );
    for (const { address } of interfce.endpoints) {
      const endpoint = interfce.endpoint(address);
      console.log(
        `Direction of endpoint with address ${address} is ${endpoint.direction}`
      );
      console.log(
        `Transfer type of endpoint with address ${address} is ${getTransferTypeDescription(
          endpoint.transferType
        )}`
      );
    }
  }
})().catch((err) => {
  console.error("Unknown error");
  console.log(err.stack);
});
