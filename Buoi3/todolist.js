var express = require("express");

var app = express();
app.listen(3000);

var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var currentDate = new Date();

app.get("/todolist", function(req, res){
  var html = "<form action='./todolist' method='post'>";
  html += "To do list: <input type='text' name='todolist' /> <br />";
  html += "<input type='submit' value='Thêm' name=btnGui />";
  html += "</form>";
  res.send(html);
  //console.log(currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds());
});

var arrToDoList = [];
app.post("/todolist", urlencodedParser, function(req, res){
  var todo = req.body.todolist;
  arrToDoList.push(todo);
  var currentHour = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  var s = "";
  s = "<form action='./todolist' method='post'>";
  s += "To do list: <input type='text' name='todolist' /> <br />";
  s += "<input type='submit' value='Thêm' name=btnGui />";
  s += "</form>";
  arrToDoList.forEach(function(item){
    s += "<h3 class = 'congviec'>" + item + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" +
    currentHour +  "</h3>";
  });
  res.send(s);
});
