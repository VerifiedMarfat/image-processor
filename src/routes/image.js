const express = require("express");
const uploadMiddleware = require("../utils/middleware").uploads;

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

  response.send({
    message: "success",
    files
  });
});

module.exports = router;
