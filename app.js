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
const multer = require("multer")
const flash = require("connect-flash")
const passwordLocalMongoose= require("passport-local-mongoose");
const connectDB = require("./config/db")
require('./config/passport')(passport);

const Guest =require("./model/guest")
const Team = require("./model/team")
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


// SET STORAGE
var storage = multer.diskStorage({
  destination:"./public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
 
var upload = multer({ storage: storage,
// fileFilter:(req,file,cb)=>{
// checkFileType(file,cb);
// }
})



// routes
app.use('/',require("./routes/user"));
app.use('/admin',require("./routes/admin"));




app.post("/admin/addguest",upload.single('guestImage'), async (req,res,next)=>{
    const newGuest = new Guest({
        username: req.body.guestName,
        profession: req.body.profession,
        podcastLink: req.body.podcastLink,
        guest_img: req.file.filename,
        description: req.body.description,
        fbLink:req.body.fbLink,
        instaLink: req.body.instaLink,
        linkedinLink: req.body.linkedinLink,
    
    });
    await newGuest.save();
    console.log(newGuest);
    
    res.redirect("/admin")
    
    })

    app.post("/admin/addteam", upload.single('teamImage'),async (req,res,next)=>{
        const newTeam = new Team({
            username: req.body.nameOfMember,
            role: req.body.roleOfMember,
            branch: req.body.branchOfMember,
            status: req.body.status,
       team_img: req.file.filename
        });
        
        await newTeam.save();
        // console.log(newTeam);
        // console.log(req.file);
        res.redirect("/admin")
        
        })
        

app.listen(3000,(req,res)=>{
    console.log("the server is running on the port 3000");
})