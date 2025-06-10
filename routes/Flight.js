const express=require('express')
const router=express.Router()
const FlightController=require('../controllers/FlightController')





router.post("/flight",FlightController.Flightcreate)
router.get("/flight",FlightController.FindFlight)
router.post("/serach",FlightController.serachflight)





module.exports=router