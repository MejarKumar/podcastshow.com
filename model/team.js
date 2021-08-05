var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 

var TeamSchema = new Schema({   

    username: {
        type: String,
        required:true
    }, 
    status:{
        type: String,
        // required: true
    },
    role:{
         type:String,
         required: true
    },
    branch:{
        type: String,
        required: true
    },
    team_img:{
        type: String,
        required: true
    }
}); 


// exporting the userschema 
 module.exports = mongoose.model("Team", TeamSchema);