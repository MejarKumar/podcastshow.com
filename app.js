require('dotenv').config();

const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const ejs = require("ejs");
const path =require("path");
const mongoose = require("mongoose");
const session = require("express-session")
const passport = require("passport");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash")
const passwordLocalMongoose= require("passport-local-mongoose");
const connectDB = require("./config/db")
require('./config/passport')(passport);


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));


connectDB();

app.use(session({
    secret: process.env.session_secret ,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.mongo_atlas_url
      })
    
  }))

app.use(flash())




// Initialization of passport
app.use(passport.initialize()); 
app.use(passport.session());


//static folder
app.use(express.static(path.join(__dirname, 'public')));



// routes
app.use('/',require("./routes/guest"));
app.use('/admin',require("./routes/admin"));



app.listen(3000,(req,res)=>{
    console.log("the server is running on the port 3000");
})