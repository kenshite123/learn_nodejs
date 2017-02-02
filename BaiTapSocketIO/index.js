var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mang = [];
var mangChat = [];

io.on("connection", function(socket){
  var socketId = socket.id;
  console.log("Co nguoi ket noi voi id: " + socket.id);

  socket.on("disconnect", function(socket){
    removeItemArray(socketId, function(){
      console.log("co nguoi vua thoat: " + socketId);
      io.sockets.emit("server-send-id", mang);
    });
  });

  pushArray(socket.id, function(){
    io.sockets.emit("server-send-id", mang);
  });

  socket.on("client-send-id", function(data){
    io.to(data).emit("chat-with-socket-id", {
      id: socket.id, mang: mangChat});
  });
  socket.on("chat", function(data){
    console.log(data.id + " vua chat: " +data.content);
    /*pushChat(data.s, function(){
      io.to(data.id).emit("chat-with-socket-id", {id: socket.id, mang: mangChat});
    });*/
  });
});

function pushChat(chat, callback){
  mangChat.push(chat);
  return callback();
}

function pushArray(id, callback){
  mang.push(id);
  return callback();
}

function removeItemArray(id, callback){
  var index = mang.indexOf(id);
  mang.splice(index, 1);
  return callback();
}

app.get("/", function(req, res){
  res.render("trangchu");
});
