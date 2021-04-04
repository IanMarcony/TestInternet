const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const fs = require("fs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: app,
  noCache: true,
});

app.use("/", (req, res) => {
  return res.render("home.html");
});

io.on("connection", (socket) => {
  console.log("Socket conectado: " + socket.id);

  fs.readFile("../data.json", "utf8", (err, data) => {
    const { registers } = JSON.parse(data);
    const sum = registers.reduce(
      (total, register) => total + register.velocidade,
      0
    );
    const media = sum / registers.length;
    socket.emit("previous", { registers, media });
  });

  socket.on("message", (data) => {
    fs.readFile("../data.json", "utf8", (err, data) => {
      const { registers } = JSON.parse(data);
      const sum = registers.reduce(
        (total, register) => total + register.velocidade,
        0
      );
      const media = sum / registers.length;
      socket.emit("updated", { registers, media });
    });
  });
});

server.listen(5555, () =>
  console.log("Server is running on http://localhost:5555")
);
