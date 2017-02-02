var express = require("express");
var app = express();

app.listen(3000);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/danhsach", function(req, res){
  var arrSP=[
    new sanPham("Iphone 7", "iphone7.jpg", "19.000.000đ"),
    new sanPham("LG G4", "lgg4.jpg", "4.000.000đ"),
    new sanPham("Samsung Galaxy S7", "samsungs7.jpg", "15.000.000đ")
  ];
  res.render("danhsach", {
    mangSP: arrSP
  });
});

function sanPham(tenSP, hinhSP, giaSP){
  this.ten = tenSP;
  this.hinh = hinhSP;
  this.gia = giaSP;
}

app.get("/menu", function(req, res){
  var arrMenu=[
    new Menu("Thể thao", ["Bóng đá", "Tennis", "Cầu lông"]),
    new Menu("Giải trí", ["Game", "Xem phim", "Làm đẹp"]),
    new Menu("Xã hội", ["Trong nước", "Ngoài nước", "Chính trị"])
  ];

  //console.log(arrMenu[1].child[2]);
  res.render("menu", {
    mangMenu: arrMenu
  });
});

function Menu(root, child){
  this.root = root;
  this.child = child;
}
