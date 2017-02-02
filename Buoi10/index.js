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
  database: 'pokemondex', //env var: PGDATABASE
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
    client.query("SELECT * FROM pokemon ORDER BY id ASC", function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }
      res.render("main", {mangPokemon: result.rows});
      //output: 1
    });
  });
});

app.get("/detail/:id", function(req, res){
  var id = req.params.id;
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM pokemon WHERE id=" + id +" ORDER BY id ASC", function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }
      res.render("main", {mangPokemon: result.rows});
      //output: 1
    });
  });
});

app.get("/pokemon/:trang", function(req, res){
  var trangdangxem = req.params.trang;
  var socon1trang = 9;
  var off = (trangdangxem - 1) * socon1trang;
  var tongSoTrang = 0;

  // tìm tổng số trang
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT COUNT(*) AS dem FROM pokemon", function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }
      tongSoTrang = Math.ceil(result.rows[0].dem / socon1trang);
    });
  });

  //

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM pokemon ORDER BY id ASC OFFSET " + off + " LIMIT " + socon1trang, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }
      //res.json(result.rows); // tạo ra json
      res.render("main", {mangPokemon: result.rows,
        tongSoTrang: tongSoTrang,
        trangdangxem: trangdangxem});
    });
  });
});
