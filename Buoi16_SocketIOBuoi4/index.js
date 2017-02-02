var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
  var socketId = socket.id;
  console.log("Co nguoi ket noi voi id: " + socketId);

  socket.on("tao-room", function(data){
    /*if(sockets.roomName.length > 0){
      console.log("abc");
    }else{*/
      socket.join(data);
      socket.roomName = data;
      io.sockets.emit('server-tao-room', data);
    //}
  });

  socket.on("doi-room", function(data){
    socket.leave(socket.roomName, function(){
      socket.join(data);
      socket.roomName = data;
      socket.emit("xac-nhan", data);
    });
  });

  socket.on("client-chat", function(data){
    io.sockets.in(socket.roomName).emit("ssmessage-in-room", data);
  });

});

app.get("/", function(req, res){
  res.render("trangchu");
});

app.get("/danhsach", function(req, res){
  console.log(io.sockets.adapter.rooms);
  res.end();
});
