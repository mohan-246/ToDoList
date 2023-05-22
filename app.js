const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const dotenv=require("dotenv");

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static("public"));
var today="To do";
    const uri=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.t4yeixy.mongodb.net/?retryWrites=true&w=majority`;
 mongoose.connect(uri);
const TaskSchema={
    task: String
};
const Task=mongoose.model("Task",TaskSchema);
const task1=new Task({
    task:"welcome to your to do list!"
});
const task2=new Task({
    task:"Hit the + button to add a new task"
});
const task3=new Task({
    task:"<-- hit this to delete an item"
});
const DefItems=[task1,task2,task3];



app.get("/", function(req, res){ 
    Task.find({})
    .then(function(tasks){
        if (tasks.length===0){
            Task.insertMany(DefItems)
       .then(function(){
          
          }).catch(function(err){
             console.log(err);
         });
         res.redirect("/");
        }
        else{
       
        res.render('list',{dayy:today,taskk:tasks});
        }
    });

});
app.post("/", function(req, res){
    var newitem=req.body.newtask;
    const newtaskk=new Task({
        task:newitem
    });
    newtaskk.save();
    res.redirect("/");
})
app.post("/delete", function(req, res){
const remove=req.body.checkbox;
Task.findByIdAndDelete(remove)
.then(function(){
    console.log("Task deleted");
    res.redirect("/");
});

});
app.listen(3000,function(){
    console.log("Listening");
});