// importing the modules 

var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 

var passportLocalMongoose = require('passport-local-mongoose'); 



var AdminSchema = new Schema({   

    username: {type: String, required:true}, 

    password : {type: String, unique: true, required:true}, 

}); 

  

// plugin for passport-local-mongoose 
AdminSchema.plugin(passportLocalMongoose); 

  
// exporting the userschema 
 module.exports = mongoose.model("Admin", AdminSchema);