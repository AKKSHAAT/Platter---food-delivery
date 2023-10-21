const express = require("express");
const router = express.Router();

router.post("/foodData", (req,res)=>{
    // res.send("loo");
    try {
        // console.log(global.food)
        res.send([global.food, global.category]);
    } catch (error) {
        
    }
});

module.exports = router;