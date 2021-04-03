const express = require("express");
const app = express();
const nunjucks = require("nunjucks");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

nunjucks.configure("views", {
  express: app,
  noCache: true,
});

app.get("/", (req, res) => {
  const { registers } = require("../data.json");
  const sum = registers.reduce(
    (total, register) => total + register.velocidade,
    0
  );
  const media = sum / registers.length;
  return res.render("home.html", { registers, media });
});

app.listen(5555, () =>
  console.log("Server is running on http://localhost:5555")
);
