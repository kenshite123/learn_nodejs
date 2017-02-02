var express = require("express");
var app = express();

app.listen(3000);
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

app.post("/", function(req, res){
  res.contentType('application/json');
  res.send(JSON.stringify(arr));
});

app.get("/login/:username/:password", urlencodedParser, function(req, res){
  res.contentType('application/json');
  var username = req.params.username;
  var password = req.params.password;
  if(username == 'admin' && password == 'admin'){
    res.send(JSON.stringify(new dataReturn(1042, 200, 'Đăng nhập thành công', [])));
  }else{
    res.send(JSON.stringify(new dataReturn(1042, 404, 'Đăng nhập thất bại', [])));
  }
});

app.post("/login", urlencodedParser, function(req, res){
  res.contentType('application/json');
  var username = req.body.username;
  var password = req.body.password;
  if(username == 'admin' && password == 'admin'){
    res.send(JSON.stringify(new dataReturn(1042, 200, 'Đăng nhập thành công', [])));
  }else{
    res.send(JSON.stringify(new dataReturn(1042, 404, 'Đăng nhập thất bại', [])));
  }
});

app.post("/loginjson", function(req, res){
	res.contentType('application/json');
	var username = req.body.username;
    var password = req.body.password;
    if(username == 'admin' && password == 'admin'){
      res.send(JSON.stringify(new dataReturn(1042, 200, 'Đăng nhập thành công', [])));
    }else{
      res.send(JSON.stringify(new dataReturn(1042, 404, 'Đăng nhập thất bại', [])));
    }
});

var arr = [
  new person(1, "Phước"),
  new person(2, "Thảo"),
  new person(3, "Chính"),
  new person(4, "Khoa"),
  new person(5, "Luân")
];

function dataReturn(c, k, m, d){
  this.code = c;
  this.key = k;
  this.message = m;
  this.data = d;
}

function person(i, n){
  this.id = i;
  this.name = n;
}
