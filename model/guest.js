var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 

var GuestSchema = new Schema({   

    username: {
        type: String,
      unique:false
        
    }, 
    profession:{
        type: String,
        required: true
    },
    podcastLink:{
         type:String
    },
    guest_img:{
        type:String,
        required: true
    }
}); 


// exporting the userschema 
 module.exports = mongoose.model("Guest", GuestSchema);