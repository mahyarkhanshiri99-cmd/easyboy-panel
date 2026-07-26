const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/login", async (req,res)=>{


    const {username,password} = req.body;


    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;



    if(
        username !== adminUsername ||
        password !== adminPassword
    ){

        return res.status(401).json({

            error:"Username or password incorrect"

        });

    }




    const token = jwt.sign(

        {
            username,
            role:"admin"
        },

        process.env.JWT_SECRET || "easyboy-secret",

        {
            expiresIn:"7d"
        }

    );



    res.json({

        token,

        username

    });


});



module.exports = router;