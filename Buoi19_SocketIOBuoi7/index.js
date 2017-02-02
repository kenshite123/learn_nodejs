var express = require("express");
var app = express();

app.listen(3000);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'demo_app_chat', //env var: PGDATABASE
  password: '123456', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/images/upload/');
  },
  filename: function(req, file, cb){
    // console.log(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});

var upload = multer({storage: storage}).single('txtFile');

app.get("/dangky", function(req, res){
  res.render("dangky");
});

app.get("/dangnhap", function(req, res){
  res.render("dangnhap");
});

app.post("/upload", urlencodedParser, function(req, res){
  // res.send(username);
  upload(req, res, function(err){
    if(err){
      res.send("Lỗi: " + err);
    }else{
      var username = req.body.txtUsername;
      var password = req.body.txtPassword;
      var hoten = req.body.txtHoTen;
      var email = req.body.txtEmail;
      var hinh = req.file.filename;

      // console.log(SHA256("Message"));
      var ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123');

      insertNewUser(username, ciphertext+"", hoten, email, hinh);
      res.end();
      // console.log(abc);
      // res.send(ciphertext + "");
      // res.redirect("dangnhap");
    }
  });
});

function insertNewUser(u, p, h, e, img){
    pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var sql = "INSERT INTO public.User (username, password, hoten, email, hinh)" +
              "VALUES('" + u + "', '" + p + "', '" + h + "', '" + e + "', '" + img + "')";
    client.query(sql, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log("Insert thành công");
      //output: 1
    });
  });
}
