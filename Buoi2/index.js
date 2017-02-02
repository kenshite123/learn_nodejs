var express = require("express");
var app = express();

app.listen(3000, function(){
  console.log("Thanh Cong");
});

///////////////////////////////
app.get("/tintuc/:id", function(req, res){
  var n = req.params.id;
  console.log(n);
  res.send(n)
  //res.end();
});

///////////////////////////////
app.get("/:pheptinh/:a/:b", function(req, res){
  var pheptinh = req.params.pheptinh;
  var a=req.params.a;
  var b=req.params.b;
  if(pheptinh=="x")
    console.log(a + pheptinh + b + "=" + (a * b));
  else if(pheptinh=="+")
    console.log(a + pheptinh + b + "=" + (parseInt(a) + parseInt(b)));
  else if(pheptinh=="-")
    console.log(a + pheptinh + b + "=" + (parseInt(a) - parseInt(b)));
  else if(pheptinh=="/")
    console.log(a + pheptinh + b + "=" + (parseInt(a) / parseInt(b)));
  res.send("Hello world");
  //res.end();
});







app.get("/hello", function(req, res){
  res.send("<h1>GETTING HELLO</h1>");
});

app.post("/hello", function(req, res){
  res.send("<h1>POSTING HELLO</h1>");
});

app.get("/form", function(req, res){
  var s="<form action='http://localhost:3000/hello' method='post'>";
      s+="<input type='submit' value='Gửi' />"
      s+="</form>";
  res.send(s);
});

/*app.get("/", function(req, res){
  var today = new Date();

  console.log((today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
  "/" + ((today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1)) +
  "/" + today.getFullYear() +
  " " + today.getHours() +
  ":" + today.getMinutes() +
  ":" + today.getSeconds());
  //res.end();
  res.send("<h1>Welcome</h1>");
});*/
