const usb = require("usb");

module.exports = function getTransferTypeDescription(transferType) {
  switch (transferType) {
    case usb.LIBUSB_TRANSFER_TYPE_BULK:
      return "bulk";
    case usb.LIBUSB_TRANSFER_TYPE_INTERRUPT:
      return "interrupt";
    case usb.LIBUSB_TRANSFER_TYPE_ISOCHRONOUS:
      return "isochronous";
    default:
      console.error(`Unknown transfer type (ID ${transferType})`);
      process.exit(1);
  }
};
