const express = require("express");
const bodyParser = require("body-parser");
var images = require("./routes/image");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) =>
  response.status(200).json({ message: "Thee has't hath opened the gates!" })
);

app.use("/images", images);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`Magic running http://localhost:${port}`);
});
