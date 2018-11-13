const path = require("path");
process.env.NODE_ENV = "test";
process.env.PORT = 5000;
process.env.APP_ROOT = path.resolve(__dirname, "../");

const server = require("../src/index.js");

module.exports = {
  server
};
