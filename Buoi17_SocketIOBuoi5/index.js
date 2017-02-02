var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

var mangUsersOnline = [];

io.on("connection", function(socket){
  console.log("Co nguoi ket noi: " + socket.id);

  socket.on("client-tao-user", function(data){
    console.log("Co nguoi dang ky voi username: " + data);
    if(mangUsersOnline.indexOf(data) >= 0){
      socket.emit("server-send-dang-ky-that-bai", data);
    }else{
      mangUsersOnline.push(data);
      socket.Username = data;
      io.sockets.emit("server-send-dang-ky-thanh-cong", {username: data, id:socket.id});
      socket.emit("hide-form-dang-ky", data);
    }
  });

  socket.on("client-send-message", function(data){
    io.sockets.emit("server-send-message", {Username: socket.Username, msg: data});
  });
});

app.get("/", function(req, res){
  res.render("trangchu");
});
