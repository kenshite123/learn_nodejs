var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangRoom = [];
var mangUser = [];

// console.log(RandomNumber(7));

io.on("connection", function(socket){
  var socketId = socket.id;
  console.log("Co nguoi ket noi voi id: " + socketId);

  socket.on("client-send-username", function(data){
    if(mangUser.indexOf(data) >= 0){
      socket.emit("server-send-register-fail", data);
    }else{
      mangUser.push(data);
      socket.Username = data;
      socket.Score = 0;
      socket.emit("")
      io.sockets.emit("server-send-register-success", {id: socket.id, name: data});
    }
  });

  socket.on("client-create-room", function(data){
    var idRoom = RandomNumber(6);
    socket.join(idRoom, function(){
      socket.idRoom = idRoom;
      socket.tenRoom = data;
      socket.userA_name = socket.Username;
      socket.userA = socket.id;

      socket.userB_name = null;
      socket.userB = null;
      mangRoom.push(idRoom);
      io.sockets.emit("server-send-room", {
        idRoom: idRoom,
        tenRoom: socket.tenRoom,
        userA_name: socket.Username,
        userA: socket.id,
        userB_name: null,
        userB: null
      });
    });
  });
});

function RandomNumber(n){
  var s = "";

  var mang = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
  "a", "s", "d", "f", "g", "h", "j", "k", "l",
  "z", "x" ,"c", "v", "b", "n", "m",
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L",
  "Z", "X" ,"C", "V", "B", "N", "M"];

  for(var i=0;i<7;i++){
    var r = Math.floor(Math.random() * mang.length);
    s = s + mang[r];
  }

  return s;
}

app.get("/", function(req, res){
  res.render("trangchu");
});
