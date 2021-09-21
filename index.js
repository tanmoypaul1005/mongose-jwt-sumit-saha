const express = require('express');
const app = express();
const port = 3000
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const todoHandler=require("./todoHandler/todoHandler");
const userHandler=require('./todoHandler/userHandler');
dotenv.config();
app.use(express.json());

// mongoose.connect("mongodb+srv://emaWatson:EA5gBOboBQnOMnlg@cluster0.nswkl.mongodb.net/emaJohnStor?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch(err => {
//     console.log("Could not connect", err);
//   });


mongoose.connect("mongodb://localhost/todo",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log("Could not connect", err);
  });


app.use('/todo',todoHandler);
app.use('/user',userHandler);

function errorHandler(err, req,res,next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error:err});
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})