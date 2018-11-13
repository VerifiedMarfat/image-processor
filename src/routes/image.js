const express = require("express");
const path = require("path");
const uploadMiddleware = require("../utils/middleware").uploads;
const imageModel = require("../models/Image");
const imageShaper = require("../utils/image-shaper");

const router = express.Router();

router.get("/", async (request, response) => {
  const { query } = request;
  const imageRequest = path.parse(query.name);
  const imageRequestSize = parseInt(query.size || 10);

  let file;
  try {
    file = await imageModel.getSingle(imageRequest.name);
  } catch (error) {
    return response.status(400).json({ message: error });
  }

  let newImagePath;
  try {
    newImagePath = await imageShaper.shape({
      filename: file.name,
      currentFileMimeType: `.${file.mimetype}`,
      newFileMimeType: imageRequest.ext,
      size: imageRequestSize
    });
  } catch (error) {
    return response.status(500).json({ message: error.toString() });
  }

  try {
    imageModel.create({
      name: file.name,
      mimetype: imageRequest.ext,
      path: file.path
    });
  } catch (error) {
    return response.status(500).json({ message: error });
  }

  response.sendFile(newImagePath);
});

router.post("/", uploadMiddleware, (request, response) => {
  const { files } = request;
  if (!files || !files.length) {
    response
      .status(400)
      .json({ message: "Bad Request! Missing file(s) in request." });
  }

  // Iterate over files
  const file = request.files[0];

  let image;
  try {
    image = imageModel.create({
      name: file.fieldname,
      mimetype: file.mimetype,
      path: file.path
    });
  } catch (error) {
    response.status(500).json({ message: error });
  }
  response.json({
    message: "success",
    data: image
  });
});

module.exports = router;
