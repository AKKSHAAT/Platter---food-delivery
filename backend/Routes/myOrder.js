const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post("/myOrder", async (req,res)=>{ 
    const userEmailFound = await Order.findOne({'email': req.body.email})
    try{
        if(userEmailFound === null){
            let msg = []
            msg.push( {"message": "Email not found"})
            res.send(JSON.stringify(msg));
        }
        else {
            const userOrders = userEmailFound.order_data;
            let orderToSend = []

            if (userOrders.length > 0) {
                userOrders.forEach( (order, index) => {
                    if(Object.keys(order[0]) == 'Order_date') 
                    {           //IF ORDER DATE FOUND MERGE ORDER DATE INTO THE ORDER DETAILS
                        let currentOrder = order[1];
                        currentOrder['Order_date'] = Object.values(order[0])[0];    //RETUNRS AN ARRAY 
                        orderToSend.push(currentOrder);
                    }
                    else {
                                //IF ORDER DATE NOT FOUND THEN SIMPALLY ADD ORDER DETAILS
                        orderToSend.push(order[0]);
                    }
                })
                res.send(JSON.stringify(orderToSend));
            }            
            else {
                let msg = [];
                msg.push({"message": "no orders"})
                res.send(JSON.stringify(msg));
            }
        }
    } catch(error) { 
        console.log(error);
    }
        
});

module.exports = router;