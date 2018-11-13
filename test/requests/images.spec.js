"use strict";

const path = require("path");
const chai = require("chai");
const expect = require("chai").expect;
const server = require("../setup.js").server;

chai.use(require("chai-http"));

const requestURL = "/images";
let imageID;
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
      expect(request.body).to.have.all.keys("message", "data");
      expect(request.body.data).to.have.all.keys(
        "id",
        "name",
        "mimetype",
        "path"
      );
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
  describe("GET image", () => {
    before(async () => {
      if (!imageID) {
        try {
          const request = await chai
            .request(server)
            .post(requestURL)
            .attach(imageData.name, imageData.url);
          imageID = request.body.data.id;
        } catch (error) {
          throw error;
        }
      }
    });

    // Clean up storage using after() method to delete test image(s)
    // after(() => {})

    it("should return image", async () => {
      let request;
      try {
        request = await chai
          .request(server)
          .get(`${requestURL}?name=${imageID}.${imageData.mimetype}`);
      } catch (error) {
        request = error;
      }

      expect(request).to.have.status(200);
    });

    it("should return modified image", async () => {
      let request;
      try {
        request = await chai
          .request(server)
          .get(`${requestURL}?name=${imageID}.png`);
      } catch (error) {
        request = error;
      }

      expect(request).to.have.status(200);
      // Check body content
    });
  });
});
