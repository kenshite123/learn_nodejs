var express = require("express");

var app = express();
app.listen(3000);

var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post("/xuly", urlencodedParser, function(req, res){
  var u = req.body.username;
  var p = req.body.password;
  console.log("Username: " + u);
  console.log("Password: " + p);
  res.send("Thành công");
});

app.get("/dangky", function(req, res){
  var html = "<form action='http://localhost:3000/xuly' method='post'>";
  html += "Username: <input type='text' name='username' /> <br />";
  html += "Password: <input type='text' name='password' /> <br />";
  html += "<input type='submit' value='Gửi' name='btnGui' />";
  html += "</form>";
  res.send(html);
});

var arrHoTen = [];
app.post("/hello", urlencodedParser, function(req, res){
  var name = req.body.hoten;
  arrHoTen.push(name);
  res.send("Co tat ca " + arrHoTen.length + " nguoi");
});

app.get("/todolist", function(req, res){
  var html = "<form action='http://localhost:3000/todolist' method='post'>";
  html += "To do list: <input type='text' name='todolist' /> <br />";
  html += "";
});
