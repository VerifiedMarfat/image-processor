const express = require("express");
const app = express();

app.get("/", (request, response) =>
  response.status(200).json({ message: "Thee has't hath opened the gates!" })
);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`Magic running http://localhost:${port}`);
});
