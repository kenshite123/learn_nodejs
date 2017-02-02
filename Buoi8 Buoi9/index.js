var express = require("express");
var app = express();

app.listen(3000);

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'demonodejs', //env var: PGDATABASE
  password: '123456', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);



app.get("/", function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM public.sinhvien ORDER BY id", function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }
      res.render("sinhvien", {mangSV: result.rows});
      //output: 1
    });
  });
});

app.post("/xuly", urlencodedParser, function(req, res){
  var hoten = req.body.txtHoTen;
  var namsinh = req.body.txtNamSinh;
  pool.connect(function(err, client, done){
    if(err){
      return console.error('error fetching client from pool', err);
    }
    var sql = "INSERT INTO public.sinhvien(\"HoTen\", \"NamSinh\")	VALUES ('" + hoten + "', " + namsinh +")";
    client.query(sql, function(err, result){
      done();
      if(err){
        console.error('error running query', err);
      }
      res.redirect("./");
    });
  });
});

app.post("/xoa/:id", function(req, res){
  var id = req.params.id;
  pool.connect(function(err, client, done){
    if(err){
      return console.error('error fetching client from pool', err);
    }
    var sql = "DELETE FROM public.sinhvien	WHERE id=" + id;
    client.query(sql, function(err, result){
      done();
      if(err){
        console.error('error running query', err);
      }
      res.redirect("../");
    });
  });
});
