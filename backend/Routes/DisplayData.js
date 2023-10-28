const express = require("express");
const router = express.Router();

//for react to get data form db
router.post("/foodData", (req,res)=>{ 
    // res.send("loo");
    try {
        // console.log(global.food)
        res.send([global.food, global.category]);
    } catch (error) {
        
    }
});

module.exports = router;