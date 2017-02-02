var express = require("express");
var app = express();

app.listen(3000);

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

function abc(i){
  setTimeout(function(){
    console.log(i);
  }, i*1000);
}

app.get("/", function(req, res){
  for(var i=0;i<5;i++){
    abc(i);
  }
  res.end();
});
