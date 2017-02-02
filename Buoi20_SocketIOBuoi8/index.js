var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

var mangQC = [
  new QuangCao('facebook.png', 'facebook.com', 'Facebook'),
  new QuangCao('twitter.png', 'twitter.com', 'Twitter'),
  new QuangCao('github.png', 'github.com', 'GitHub')
];

io.on("connection", function(socket){
  console.log("Co nguoi ket noi: " + socket.id);

  socket.on("client-send-quang-cao", function(data){
    for(var i = 0; i < mangQC.length; i++){
      if(mangQC[i].hinh.indexOf(data) >= 0){
          // console.log(mangQC[i]);
          io.sockets.emit("server-send-quang-cao", data);
          return;
      }
    }
    // console.log(data);
  });
});

app.get("/homepage", function(req, res){
  app.render("homepage");
});

app.get("/", function(req, res){
  res.render("admin", {mangQC: mangQC});
});

function QuangCao(hinh, link, ten){
  this.hinh = hinh;
  this.link = link;
  this.ten = ten;
}
