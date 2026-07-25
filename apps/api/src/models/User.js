const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },


    username:{
        type:String,
        default:""
    },


    telegramId:{
        type:String,
        unique:true
    },


    role:{
        type:String,
        default:"User"
    },


    status:{
        type:String,
        default:"Active"
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "User",
    UserSchema
);