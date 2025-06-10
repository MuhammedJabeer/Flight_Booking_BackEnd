const { response } = require('../app');
const razorpay=require('../connect/razorpay');
const Payment = require('../models/Payment');




exports.createpayment=async(req,res)=>{
     try{
        const {amounts,user,flightId}=req.body
        console.log("paymet",req.body)
         const order = await razorpay.orders.create({
           amount: amounts,
           currency: "INR",
           receipt: `receipt_${Date.now()}`,
         });

          const payment=new Payment({
             user,
             flight: flightId,
             amount:amounts,
              razorpayOrderId: order.id,
              status: "created",
          })
          await payment.save()
          console.log("payaaaa",payment)
          console.log("rs",amounts)
          return res.status(201).json({success: true, order,amount:amounts},)
     }catch(error){
        console.log(error)
     }
}



