const express=require("express")
const orderRouter=express.Router()
const orderController=require("../controllers/orderController")
const userAuthenticate=require("../middlewares/userAuthenticate")
const errhandle=require("../middlewares/errorhandler")
//order
orderRouter.get("/getallorders",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(orderController.getAllOrders))
orderRouter.get("/getorder/:orderId",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(orderController.getOrder))
orderRouter.post("/createorder",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(orderController.createOrder))
orderRouter.put("/updateorder/:orderId",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(orderController.updateOrder))
orderRouter.delete("/deleteorder/:orderId",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(orderController.deleteOrder))
//export the orderRouter
module.exports=orderRouter