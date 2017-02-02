var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

var mangRoom = [];

io.on("connection", function(socket){
  console.log("Co nguoi ket noi: " + socket.id);

  socket.on("user-tao-room", function(data){
    socket.leave(data, function(){
      socket.join(data);
      socket.RoomName = data;
    });

    if(mangRoom.indexOf(data) >= 0){
      console.log("Da ton tai room name: " + data);

    }else{
      mangRoom.push(data);
      io.sockets.emit("server-send-new-room", data);
    }
  });

  socket.on("user-change-room", function(data){
    socket.leave(socket.RoomName, function(){
      socket.join(data);
      console.log(socket.id + " vua doi room tu " + socket.RoomName + " -> " + data);
      socket.RoomName = data;
      socket.emit("server-send-new-room-changed", data);
    });
  });

  socket.on("user-send-message", function(data){
    io.sockets.in(socket.RoomName).emit("server-send-message", data);
  });

});

app.get("/", function(req, res){
  res.render("trangchu");
});

app.get("/danhsach", function(req, res){
  console.log(io.sockets.adapter.rooms);
  res.end();
});
