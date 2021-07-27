const passport = require("passport");
const Admin= require("../model/admin");
const LocalStrategy = require('passport-local').Strategy; 
const mongoose =require("mongoose");
const bcrypt = require("bcryptjs")

module.exports = (passport)=>{

    passport.use(new LocalStrategy({usernameField:'username'},(username,password,done)=>{
        // match user
        Admin.findOne({username:username}).then(admin=>{
            if(!admin){
                return done(null,false,{message:'The username is not registered for admin'})
            }
            bcrypt.compare(password, admin.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(err,admin);
                }else{
                    return done(null, false,{message:' Password is not correct !'})
                }
            })
        })
    }));

    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
          done(err, admin);
        });
      });
}





