var express = require("express");
var app = express();

app.listen(3000);

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var arrPokemon = [
  new pokemon(1, "001.png", "Bulbasaur", 0),
  new pokemon(2, "002.png", "Ivysaur", 0),
  new pokemon(3, "003.png", "Venusaur", 0),
  new pokemon(4, "004.png", "Charmander", 0),
  new pokemon(5, "005.png", "Charmeleon", 0),
  new pokemon(6, "006.png", "Charizard", 0),
  new pokemon(7, "007.png", "Squirtle", 0),
  new pokemon(8, "008.png", "Wartortle", 0)
];

app.get("/", function(req, res){
  //res.render("index", {mangPokemon: arrPokemon});
  res.contentType('application/json');
  res.send(JSON.stringify(arrPokemon));
});

app.post("/timkiem", urlencodedParser, function(req, res){
  // txtPok
  var search = req.body.txtPok;
  var mangKQ = [];
  // duyệt mangPokemon
  for(i=0;i<arrPokemon.length;i++){
    if(arrPokemon[i].ten.search(search)!=-1){
      mangKQ.push(arrPokemon[i]);
    }
  }
  //res.render("index", {mangPokemon: mangKQ});
  res.contentType('application/json');
  res.send(JSON.stringify(mangKQ));
});

app.get("/like/:id", function(req, res){
  var id = req.params.id;
  arrPokemon.forEach(function(item){
    if(item.id == id){
      var like = item.like;
      like = parseInt(like) + 1;
      item.like = like;
    }
  });
  //res.end();
  res.redirect("../");
});

function pokemon(i, h, t, l){
  this.id = i;
  this.hinh = h;
  this.ten = t;
  this.like = l;
}

// tạo row /like/:id
// sau khi xử lý xong dùng redirect để tải lại trang web
// res.redirect("./")
