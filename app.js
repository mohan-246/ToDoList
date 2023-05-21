const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
var tasks=["Buy Food", "Cook Food", "Eat Food"];
app.use(express.static("public"));


app.get("/", function(req, res){ //ss

var today=new Date();
var options={
    weekday:"long",
    day:"numeric",
    month:"long"
};

var date=today.toLocaleDateString('en-US',options);
res.render('list',{dayy:date,taskk:tasks});
});
app.post("/", function(req, res){
    var task=req.body.newtask;
    tasks.push(task);
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Listening");
});