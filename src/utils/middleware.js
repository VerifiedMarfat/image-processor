const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { OUTPUT_DIR, UPLOAD_PATH } = require("../constants");

const uploads = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      }

      if (!fs.existsSync(UPLOAD_PATH)) {
        fs.mkdir(UPLOAD_PATH, error => callback(error, UPLOAD_PATH));
      } else {
        callback(null, UPLOAD_PATH);
      }
    },
    filename: (request, file, callback) => {
      const filename = path.parse(file.originalname).name;
      file.fieldname = filename;
      file.mimetype = file.mimetype.replace("image/", "");

      // @NOTE Files with existing name will be replaced!
      // When switching to S3 log the file url against each unique id.
      // And use this to retrieve the image based on id instead of name
      callback(null, `${filename}.${file.mimetype}`);
    }
  })
}).any();

module.exports = {
  uploads
};
