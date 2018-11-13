const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const {
  APP_ROOT,
  OUTPUT_DIR,
  UPLOAD_PATH,
  OUTPUT_PATH
} = require("../constants");

const shape = async ({
  filename,
  currentFileMimeType,
  newFileMimeType,
  size = 10
}) => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  // Get image from S3 instance instead of locally
  const filepath = path.resolve(
    APP_ROOT,
    `${UPLOAD_PATH}/${filename}${currentFileMimeType}`
  );

  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }

  const imagePath = path.resolve(
    APP_ROOT,
    `${OUTPUT_PATH}/${filename}${newFileMimeType}`
  );

  try {
    await sharp(filepath)
      .resize(size)
      // Save image to S3 using the .toBuffer method of sharp
      .toFile(imagePath);
  } catch (error) {
    throw error;
  }

  // Return the url of the image that lives on S3 now
  return imagePath;
};

module.exports = {
  shape
};
