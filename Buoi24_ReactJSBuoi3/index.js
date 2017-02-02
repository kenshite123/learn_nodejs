var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(3000);

var mang = ["Android", "iOS", "Node"];

app.get("/", function(req, res){
  res.render("trangchu");
});

app.get("/info", function(req, res){
  res.send(mang);
});

app.post("/hello", urlencodedParser, function(req, res){
  var ten = req.body.hoten;
  var tuoi = req.body.tuoi;
  res.send("Name: " + ten + " Age: " + tuoi);
});

app.post("/add", urlencodedParser, function(req, res){
  var text = req.body.noiDung;
  mang.push(text);
  res.send(mang);
});

app.post("/sua", urlencodedParser, function(req, res){
  var id = req.body.id;
  var monHoc = req.body.monHoc;
  mang[id] = monHoc;
  res.send(mang);
});

app.post("/xoa", urlencodedParser, function(req, res){
  var id = req.body.id;
  mang.splice(id, 1);
  res.send(mang);
});

app.get("/json", function(req, res){
  var str = '{ "name": "John Doe", "age": 42 }';
  var obj = JSON.parse(str);
  res.send(obj);
});
