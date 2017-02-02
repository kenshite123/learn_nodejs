var express = require("express");
var app = express();

app.listen(3000);

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// session
var session = require('express-session');
app.use(session(
  {
    secret: 'keyboard.cat', // ko để cho ai biết chỗ này
    cookie: { maxAge: 10000 } // thời gian sống
  }
))


app.get("/hello", function(req, res){
  var sess = req.session;
  sess.n = 1000;
  sess.mang = ["1", "2", "3"];
  res.send("" + sess.n);
});

app.get("/goodbye", function(req, res){
  var sess = req.session;
  console.log(sess.mang.length);
  /*
  if(sess.n){
    res.send("" + sess.n);
  }else{
    console.log("Ban chua vao trang chu");
    res.redirect("http://localhost:3000/hello");
  }
  */
});


/*
app.get("/", function(req, res){
  for(var i=0;i<5;i++){
    setTimeout(function(){
      console.log(i);
    }, i*1000);
  }
  res.end();
});
*/
