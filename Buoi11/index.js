var express = require("express");
var app = express();

app.listen(3000);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var pg = require('pg');
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'demoTinTuc', //env var: PGDATABASE
  password: '123456', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

var theloai;
var danhmuc=[];

app.get("/", function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      console.error('error fetching client from pool', err);
    }
    client.query('SELECT "TheLoai"."TenTL", "LoaiTin"."Ten" from public."TheLoai" NATURAL INNER JOIN public."LoaiTin"', function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }
      var theloai;
      var danhmuc=[];

      for(var i=0;i<result.rows.length-1;i++){
        for(var j=i+1;j<result.rows.length;j++){
          if(result.rows[i].TenTL == result.rows[j].TenTL){
            var loaitin=[];

            loaitin.push(result.rows[i].Ten);
            loaitin.push(result.rows[j].Ten);

            theloai=new Menu(result.rows[i].TenTL, loaitin);
            danhmuc.push(theloai);
          }
        }
      }
      res.render("index", {mangMenu: danhmuc});
    });
  });
});


app.get("/cach2", function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM public."TheLoai"', function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);
      }

      var arrmenu=[];
      var menucach2;
      result.rows.forEach(function(item){
        // móc database

        pool.connect(function(err, client, done) {
          if(err) {
            return console.error('error fetching client from pool', err);
          }
          client.query('SELECT * FROM public."LoaiTin" WHERE "idTL"=' + item.idTL, function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
              console.error('error running query', err);
            }

            var loaitintheoid=[];
            result.rows.forEach(function(itemLoaiTin){
              loaitintheoid.push(itemLoaiTin.Ten);
            });
            menucach2=new Menu(item.TenTL, loaitintheoid);
            arrmenu.push(menucach2);

            console.log(arrmenu);
          });
        });

        // kết thúc phần móc database
      });// kết thúc vòng lặp
      res.end();
    });
  });
});

function getLoaiTin(t){
  this.Ten=t;
}

function Menu(theloai, loaitin){
  this.theloai=theloai;
  this.loaitin=loaitin;
}
