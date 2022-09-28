const express=require("express")
const userRouter=express.Router()
const userController=require("../controllers/userController")
const userAuthenticate=require("../middlewares/userAuthenticate")
const errhandle=require("../middlewares/errorhandler")
//user routes
userRouter.post("/signup",errhandle.handle(userController.signup))
userRouter.post("/login",errhandle.handle(userController.login))
userRouter.get("/getloggedinuser",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(userController.getLoggedInUser))
userRouter.put("/updateuser",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(userController.updateUser))
userRouter.post("/logout",errhandle.handle(userAuthenticate.loginVerify),errhandle.handle(userController.logout))
//export the userRouter
module.exports=userRouter