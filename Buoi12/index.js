var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();

app.listen(3000);

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var secret = "abc";

app.get("/a", function(req, res){
  res.render("index");
});

app.get("/b/:token", function(req, res){
  var token = req.params.token;
  if(token) {
    jwt.verify(token, secret, function(err, decoded){
        if(err) {
          //res.send("Xác thực lỗi");
          res.redirect("../a");
        } else {
          req.decoded = decoded;
          res.send("Chào bạn: " + decoded.name);
        }
      }
    );
  } else {
    res.redirect("../a");
    //res.send("Chưa xác thực");
  }
});

app.post("/xuly", urlencodedParser, function(req, res){
  var hoten = req.body.txtHoTen;
  var username = req.body.txtUser;
  var password = req.body.txtPass;

  var token = jwt.sign(
    {
      name: hoten,
      username: username,
      password: password
    }, // json chứa thông tin
    secret, // biến secret
    {expiresIn: 30} // thời gian sống ---> tính bằng giây
  );
  //res.send(token);
  res.redirect("../b/" + token);
});
