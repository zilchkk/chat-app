const exp = require("constants");
const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 8001;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected...");

  socket.on("new-user", (name) => {
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
