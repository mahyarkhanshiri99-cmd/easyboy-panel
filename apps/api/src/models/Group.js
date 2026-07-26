const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    chatId:{
        type:String,
        required:true,
        unique:true
    },

    members:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        default:"Active"
    },

    botStatus:{
        type:String,
        default:"Online"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Group", GroupSchema);