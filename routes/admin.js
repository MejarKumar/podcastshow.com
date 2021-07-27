const express = require("express");
const router = express.Router();
const Admin = require('../model/admin')
const flash = require("connect-flash");
const passport = require("passport")
const bcrypt = require("bcryptjs")
const db = require("../config/db")
const {ensureAuth} = require("../middleware/auth")

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/",ensureAuth, (req, res) => {
   res.render("home")
})



router.post("/signup", (req, res) => {

    const { username, password } = req.body;
    console.log(req.body.username);
    let error = [];
    if (!username || !password) {
        error.push({ msg: "Please fill all the fields" });
        res.render("signup", { username, password, error })
    } else {
        Admin.findOne({ username: username }).then(admin => {
            if (admin) {
                error.push({ msg: "admin already exits.." })
                console.log("admin already exits..");
            } else {
                const newAdmin = new Admin({
                    username,
                    password
                })
                console.log(newAdmin);


                // hashing of password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;

                        newAdmin.save().then(admin => {
                            req.flash('success_msg', 'You are now registered !')
                            res.redirect("/admin/login")
                        }).catch(err => console.log(err))
                    });
                })

            }
        })
        // res.redirect("/admin")
    }

})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/admin/login',
        failureFlash: true
    })(req,res,next);
});

router.get('/logout',(req,res)=>{
req.logout();
res.redirect("/admin/login");
});



module.exports = router;