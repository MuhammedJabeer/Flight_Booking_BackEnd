
const mongoose=require('mongoose');
require('dotenv').config();

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connected");
    }catch(error){
        console.error(error)
    }
}


module.exports=connectDb