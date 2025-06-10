const mongoose=require('mongoose')


const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
          type:String,
          required:true,
          unique:true,
          trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    isVerified:{
           type:Boolean,
           default:false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      }
    },
    { timestamps: true }
)


module.exports=mongoose.model("Users",userschema)