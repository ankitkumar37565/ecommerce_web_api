const express=require("express")
const paymentRouter=express.Router()
const userAuthenticate=require("../middlewares/userAuthenticate")
const errhandle=require("../middlewares/errorhandler")
//load the controllers
const paymentController=require("../controllers/paymentController")
//payment routes
paymentRouter.post("/createpayment",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(paymentController.createPayment))
paymentRouter.get("/getpayment/:paymentId",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(paymentController.getPayment))
paymentRouter.put("/updatepayment/:paymentId",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(paymentController.updatePayment))
paymentRouter.delete("/deletepayment/:paymentId",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(paymentController.deletePayment))

//export the router
module.exports=paymentRouter