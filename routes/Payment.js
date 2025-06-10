const express=require('express')
const router=express.Router()
const Paymentcontrolle=require('../controllers/Payment')






router.post("/create-order",Paymentcontrolle.createpayment)



module.exports=router