const Flight=require("../models/flight")



exports.Flightcreate=async(req,res)=>{
          try{
               const{flightNumber,departureDate,arrivalDate,departureAirport,arrivalAirport,airlineName,duration,price}=req.body
                console.log(req.body);
                
               
               const flight=new Flight({
                flightNumber,
                departureDate,
                arrivalDate,
                departureAirport,
                arrivalAirport,
                airlineName,
                duration,
                price
               })
                await flight.save()
                 res.status(201).json({
                 message: "Flight created successfully",
                  flight:flight,
                 });
          }catch(error){
            console.error(error)
          }
}




exports.FindFlight=async(req,res)=>{
    try{
        const flight=await Flight.find();
        console.log("flights",flight)
        res.status(200).json(flight)
    }catch(error){
        console.error(error)
    }
}



exports.serachflight=async(req,res)=>{

          try{
              const {from,to}=req.body
              console.log("req",req.body)

              if(!from || !to){
                return res.status(401).json({message:"Please fill all required fields"})
              }

            const flight=await Flight.find({
               departureAirport:{ $regex: new RegExp(from, 'i') },
               arrivalAirport  :{$regex: new RegExp(to,'i')}
            })
            console.log("fligth",flight)

            return res.status(201).json({flight})
          }catch(error){
                return res.status(500).json({message:"internal server error"})
          }

}