//console.log("Hello World\n");

var a = [0,1,2,6,4,5,6,1,4,7,5];
/*
for(var i=0;i<a.length;i++){
  console.log(a[i]);
}*/

// duyệt mảng sài forEach
// tên mảng . forEach

/*
a.forEach(function(i){
  console.log("----" + a[i]);
});
*/

/*
var mang=[ [1.1, 1.2, 1.3], [2.1, 2.2, 2.3], [3.1, 3.2] ];
mang.forEach(function(item){
  item.forEach(function(x){
    console.log("---- " + x);
  })
});
*/

function sinhVien(h, t, n){
  this.Ho=h;
  this.Ten=t;
  this.NamSinh=n;
}

var chinh=new sinhVien("Bui", "Chinh", 1994);
//console.log(chinh.Ho + " - " + chinh.Ten + " - " + chinh.NamSinh);

function tong(a, b){
  return a+b;
}

var c = tong(5, 7);
//console.log(c+"\n");

function RandomNumber(n){
  var s = "";

  var mang = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
  "a", "s", "d", "f", "g", "h", "j", "k", "l",
  "z", "x" ,"c", "v", "b", "n", "m",
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L",
  "Z", "X" ,"C", "V", "B", "N", "M"];

  var r = Math.floor(Math.random() * mang.length);
  s = s + mang[r];

  return s;
}
var s = "";
for(var i=0;i<16;i++){
  
  s += RandomNumber(7);
  
}
console.log(s);
