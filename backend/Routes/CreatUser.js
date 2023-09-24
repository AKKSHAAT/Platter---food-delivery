const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');


router.post("/createuser", 
    body('email', 'not an email').isEmail(),
    body('password', 'Password should have 5 or more characters').isLength({ min: 5 }), 
    async (req, res)=>{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array(),status:false});
        }

        const user = req.body;

        try {
            await User.create({
                name:user.name,
                location:user.location,
                email:user.email,
                password:user.password
            })
            .then(user=>{
                res.json({success: true});
                console.log("True");
            })
        } 
        catch (error) {
            // res.json({success: false});
            console.log(error);
        }
});

module.exports = router;