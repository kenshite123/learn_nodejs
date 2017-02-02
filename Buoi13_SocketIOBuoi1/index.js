var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
  console.log("co nguoi ket noi " + socket.id);

  var socketId = socket.id;

  socket.on("disconnect", function(socket){
    console.log("co nguoi thoat ket noi " + socketId);
  });
});

app.get("/", function(req, res){
  res.render("trangchu");
});
