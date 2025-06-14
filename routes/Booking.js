const express=require('express')
const router=express.Router()
const Bookingcontroller=require('../controllers/BookingConroller')





router.post('/booking',Bookingcontroller.flightBooking)
router.post("/Mybooking",Bookingcontroller.Mybooking)
router.post("/cancelbooking",Bookingcontroller.CancelBooking)



module.exports=router;