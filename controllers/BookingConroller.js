
const Booking=require('../models/Booking')
const User=require('../models/Users')



exports.flightBooking=async(req,res)=>{
    try{

        const {flightId,passengers,totalAmount,user}=req.body
        console.log("booking details",req.body)
        
        const newBooking=new Booking({
              user,
              flight:flightId,
              passengers,
              totalAmount ,
              status: "confirmed"   
        })
        await newBooking.save()
          
         const updatedPayment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        status: "paid",
        booking: newBooking._id,
      },
      { new: true }
    );
        console.log("new",updatedPayment)
         return  res.status(201).json({message:"Booked suucessFully",Booking:newBooking,Payment:updatedPayment});

    }catch(error){
         return  console.error("error")
    }
}


exports.Mybooking=async(req,res)=>{
    try{
          const{userId}=req.body
          console.log("req",req.body)
          const bbooking=await Booking.find({user:userId ,isDeleted: { $ne: true }}).populate('flight')
          console.log("booking",bbooking)
          return res.status(201).json({bbooking})
    }catch(error){
        console.log("error",error)
    }
}


exports.CancelBooking=async(req,res)=>{
    try{
            const {bookId}=req.body
            console.log("id",req.body)
            const cancelbooking=await Booking.findByIdAndUpdate(bookId,{ status: "Cancelled", isDeleted: true },
      { new: true })
           
            return res.status(200).json(cancelbooking)
    }catch(error){
        console.log(error)
    }
}