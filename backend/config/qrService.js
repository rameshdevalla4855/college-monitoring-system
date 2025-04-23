const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const generateQRCode = async (data, filename) => {
  const qrFolder = path.join(__dirname, "../qrcodes");
  if (!fs.existsSync(qrFolder)) {
    fs.mkdirSync(qrFolder);
  }

  const filepath = path.join(qrFolder, filename);
  await QRCode.toFile(filepath, data);
  return filepath;
};

module.exports = generateQRCode;
