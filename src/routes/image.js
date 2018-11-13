const express = require("express");
const uploadMiddleware = require("../utils/middleware").uploads;
const imageModel = require("../models/Image");

const router = express.Router();

router.get("/", (request, response) => {
  response.json({ message: "Thou art h're" });
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

  response.send({
    message: "success",
    image
  });
});

module.exports = router;
