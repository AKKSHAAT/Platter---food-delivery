const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Orders");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret = "itsA$ecret1Ma0";

router.post("/createuser",
  body("email", "not an email").isEmail(),
  body("password", "Password should have 5 or more characters").isLength( {min: 5,} ),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), status: false });
    }

    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);

    try {

      await User.create({
        name: user.name,
        location: user.location,
        email: user.email,
        password: passwordHash,
      })
      await Order.create({
        email: user.email,
        order_data: []
      })
      .then((user) => {
        res.status(201).json({ success: true });
        console.log("True");
      });

    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/loginuser",
    body("email", "not an email").isEmail(), 
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), status: false });
        }

        const user = req.body;
        try {
            let userAccountFound = await User.findOne({email: user.email,})
            .then(userAccountFound => {
                
                if(!userAccountFound) {
                    return res.status(400).json({errors:"user Email not found",
                                                 success: false});
                }

                // check password and login
                bcrypt.compare( user.password, userAccountFound.password, (error, result)=>{
                  if(result == true) { 
                    const data = {
                      user: { id: userAccountFound.id }
                    }
                    
                    const authToken = jwt.sign(data, jwtSecret);
                    return res.status(200).json({success: true, authToken: authToken}); 
                  } 
                  else { 
                    return res.status(400).json({errors:"incorrect password", success: false});
                  }
                })
            });
        } catch (error) {
            console.log(error);
            return res.json({success: false});
        }
    }
);

module.exports = router;
