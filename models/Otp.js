const mongoose=require('mongoose')




const OtpSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      otp:{
        type:String,
        required:true
      },
    expiresAt: {
        type: Date,
         required: true,
      },
},{timestamps:true})




module.exports=mongoose.model('otp',OtpSchema)