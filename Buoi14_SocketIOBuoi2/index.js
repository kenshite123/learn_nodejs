var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUser = [];

io.on("connection", function(socket){
  var socketId = socket.id;
  console.log("Co nguoi ket noi: " + socketId);
  socket.on("client-gui-un", function(data){
    console.log(socketId + ": " + data);
    if(mangUser.indexOf(data)>=0){
      socket.emit("server-gui-thong-bao", "User này đã được đăng ký");
    }else{
      mangUser.push(data);
      io.sockets.emit("server-gui-un", data);
    }
  });
});

app.get("/", function(req, res){
  res.render("trangchu");
});
