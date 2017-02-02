var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mang = [];

io.on("connection", function(socket){
  console.log("co nguoi ket noi " + socket.id );
  xuly(socket.id, function(){
    io.sockets.emit("server-send-id", mang);
  });

  socket.on("client-send-id", function(data){
    io.to(data).emit("doi-mau", socket.id);
  });
});

function xuly(id, callback){
  mang.push(id);
  return callback();
}

app.get("/", function(req, res){
  res.render("trangchu");
});
