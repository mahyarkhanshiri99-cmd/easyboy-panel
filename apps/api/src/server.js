const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");


const app = express();


app.use(cors());
app.use(express.json());




// Test API

app.get("/", (req,res)=>{

    res.json({

        status:"online",
        name:"EasyBoy API",
        version:"1.0.0"

    });

});





// Dashboard Stats

app.get("/api/stats",(req,res)=>{

    res.json({

        users:12540,
        groups:320,
        messages:"84K",
        bot:"online"

    });

});






// Users

app.get("/api/users", async(req,res)=>{

    try{

        const users = await User.find()
        .sort({
            createdAt:-1
        });


        res.json(users);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});







// Logs

app.get("/api/logs",(req,res)=>{


    res.json([

        {
            action:"User Joined",
            status:"Success",
            time:"2 min ago"
        },


        {
            action:"Message Deleted",
            status:"Success",
            time:"5 min ago"
        }


    ]);


});








// Servers Status

app.get("/api/servers/status",(req,res)=>{


    res.json({


        servers:[


            {

                name:"EasyBoy Bot",

                type:"Telegram Bot",

                status:"Online",

                location:"Railway",

                uptime:"Running"

            },



            {

                name:"EasyBoy API",

                type:"Backend",

                status:"Online",

                location:"Railway",

                uptime:"Running"

            },



            {

                name:"MongoDB",

                type:"Database",

                status:"Online",

                location:"MongoDB Atlas",

                uptime:"Connected"

            }


        ],



        checkedAt:new Date()


    });


});







mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("✅ MongoDB Connected");

})

.catch((err)=>{

    console.log(
        "MongoDB Error:",
        err.message
    );

});






const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `🚀 EasyBoy API running on port ${PORT}`
    );

});