const fs = require("fs");
const path = require("path");
const { OUTPUT_DIR, DB_FILE_NAME } = require("../constants");

const filepath = path.resolve(OUTPUT_DIR, DB_FILE_NAME);
let schema = {
  images: []
};

const createID = () => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

// Save to S3 instead
const create = payload => {
  const content = {
    id: createID(),
    name: payload.name,
    mimetype: payload.mimetype,
    path: payload.path
  };

  if (fs.existsSync(filepath)) {
    let data;
    try {
      data = fs.readFileSync(filepath);
    } catch (error) {
      throw error;
    }
    schema = JSON.parse(data);
  }

  schema.images.push(content);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(filepath, JSON.stringify(schema), "utf8");
  return content;
};

module.exports = {
  create
};
