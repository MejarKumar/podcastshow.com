var mongoose = require('mongoose'); 
const date = require('date-and-time');
var Schema = mongoose.Schema; 
const now = new Date();

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
    },
    // rating:{
    //     type: Number
    // },
    fbLink:{
        type:String
    },
    instaLink:{
        type:String
    }  ,
    linkedinLink:{
        type:String
    },
    createdAt:{
        type:String,
        default:date.format(now, 'YYYY/MM/DD')
    },
    description:{
        type:String
    }

}); 


// exporting the userschema 
 module.exports = mongoose.model("Guest", GuestSchema);