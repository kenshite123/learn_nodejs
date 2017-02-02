var express = require("express");

var app = express();
app.listen(3000);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public/"));

app.get("/hello", function(req, res){
  res.render("hello", {
    hoten: "Bùi Công Chính",
    danhsach:["iOS", "Android", "Window Phone", "C#", "Java"],
    sinhVien: chinh
  });
});

app.get("/tong/:a/:b", function(req, res){
  var a = req.params.a;
  var b = req.params.b;
  res.render("tinh", {a: a, b: b});
});


app.get("/goodbye", function(req, res){
  res.render("hello");
});

function sinhVien(ho, ten){
  this.ho = ho;
  this.ten = ten;

}
var chinh = new sinhVien("Bui", "Chinh");
//console.log(chinh.ho, chinh.ten);
