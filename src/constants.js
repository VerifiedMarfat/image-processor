const path = require("path");
const assetsRoot = "output";

module.exports = {
  APP_ROOT: process.env.APP_ROOT || path.resolve(__dirname, "../"),
  OUTPUT_DIR: assetsRoot,
  UPLOAD_PATH: `${assetsRoot}/assets`,
  OUTPUT_PATH: `${assetsRoot}/uploads`,
  DB_FILE_NAME: "index.json"
};
