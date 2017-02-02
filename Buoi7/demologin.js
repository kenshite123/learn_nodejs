var express = require("express");
var app = express();

app.listen(3000);

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

function user(ht, u, p){
  this.hoten = ht;
  this.username = u;
  this.password = p;
}

var mangUser = [
  new user("Chinh Bui", "chinhbui", "123"),
  new user("Chinh Nguyen", "chinhnguyen", "123"),
  new user("Chinh Pham", "chinhpham", "123"),
  new user("Chinh Tran", "chinhtran", "123")
];

// session
var session = require('express-session');
app.use(session(
  {
    secret: 'keyboard.cat', // ko để cho ai biết chỗ này
    cookie: { maxAge: 10000 } // thời gian sống
  }
))

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/xuly", urlencodedParser, function(req, res){
  var sess = req.session;
  var username = req.body.txtUser;
  var password = req.body.txtPass;
  //console.log(username + " - " + password);
  mangUser.forEach(function(item){
    if(username == item.username && password == item.password){
      sess.kq=1;
      sess.hoten=item.hoten;
      res.redirect("./admin");
      return;
    }
  });
});

app.get("/admin", function(req, res){
  var sess = req.session;
  if(sess.kq){
    var chao = "Chào bạn " + sess.hoten;
    res.send(chao);
  }else{
    res.redirect("./login");
  }
});
