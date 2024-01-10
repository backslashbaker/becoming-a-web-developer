const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assests/index.html"));
});

app.get("/css/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "assests/mystyle.css"));
});

app.listen(port, () => {
  console.log(`Server Side Rendering app listening on port ${port}`);
});
