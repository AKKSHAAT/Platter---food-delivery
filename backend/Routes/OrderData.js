//saves data into backend should be named saveOrderData
const express = require("express");
const router = express.Router();

const Order = require('../models/Orders');

router.post("/orderData", async (req,res)=>{ 
    const data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date})

    // if email not in DB then Create else Update

    const userEmail = await Order.findOne({'email': req.body.email});
    console.log("email::::: " + req.body.email);

    if(userEmail ===  null) {
        console.log("adding new");
        try {
            console.log(data);
            await Order.create({
                email: req.body.email,
                order_data: [data]
            })
            .then(()=>{
                res.json({ success: true});
            })
        }
        catch (error) {
            console.log("ERRORRRR!!!! " +error);
            res.status(500).send(error.messege);
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({
                email: req.body.email},
                {$push: {order_data: data}})
                .then(()=>{
                    res.status(200).send({success: true});
                })
        } 
        catch (error) {
            console.log("ERRORRRR!!!! " +error);
            res.status(500).send(error.messege);
        }
    }


});

module.exports = router;