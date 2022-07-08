const express=require("express");
const path=require("path");
const fs=require("fs");
const { Console } = require("console");
const app=express();
// const bodyparser=require("body-parser");
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Dance',{useNewUrlParser:true});
const port=80;

//define moongoose schema
var contactSchema=new mongoose.Schema({
    name:String,
    age: String,
    gender: String,
    phone: String,
    experiance: String
});
var contact=mongoose.model('contact',contactSchema);

//express extension
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//pug
app.set('viewengine','pug');//set templete engine as pug
app.set('views',path.join(__dirname,'views'))//set the view directory

//endpoint
app.get('/',(req,res)=>{
    const params={'title':'Welcome To dance.com'};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={'title':'Welcome To dance.com'};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    // name=req.body.name;
    // age=req.body.age;
    // gender=req.body.gender;
    // phone=req.body.phone;
    // experiance=req.body.experiance;
    // console.log(`Name is ${name}, ${gender}, and he/she is ${age} years old.`);
    // console.log(`${phone},`);
    // console.log(`experiance: ${experiance}`);

    // const params={'title':'Welcome To dance.com'};
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
})

//server
app.listen(port,()=>{
    console.log(`Application successfully started on port ${port}`);
});
