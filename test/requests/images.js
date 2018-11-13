"use strict";

const path = require("path");
const chai = require("chai");
const expect = require("chai").expect;
const server = require("../setup.js").server;

chai.use(require("chai-http"));

const requestURL = "/images";
let imageData = {
  name: "test-image",
  mimetype: "jpeg"
};
imageData.fullname = `${imageData.name}.${imageData.mimetype}`;
imageData.url = path.resolve(__dirname, `../${imageData.fullname}`);

describe("/image", () => {
  describe("POST image", () => {
    it("should return newly created record of image", async () => {
      let request;
      try {
        request = await chai
          .request(server)
          .post(requestURL)
          .attach(imageData.name, imageData.url);
      } catch (error) {
        request = error;
      }

      expect(request).to.have.status(200);
      expect(request.body).to.have.all.keys("message", "files");
    });

    it("should return 400 response when no image is provided", async () => {
      let request;
      try {
        request = await chai.request(server).post(requestURL);
      } catch (error) {
        request = error;
      }

      expect(request).to.have.status(400);
      expect(request.body).to.have.all.keys("message");
    });

    // Add test when sending files with invalid mimetype
  });
});
