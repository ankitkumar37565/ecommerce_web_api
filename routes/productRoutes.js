const express=require("express")
const productRouter=express.Router()
const productController=require("../controllers/productController")
const userAuthenticate=require("../middlewares/userAuthenticate")
const errhandle=require("../middlewares/errorhandler")
//product 
productRouter.post("/createproduct",errhandle.handle(productController.createProduct))
productRouter.get("/getproducts",errhandle.handle(productController.getProducts))
productRouter.put("/updateproduct/:productId",errhandle.handle(productController.updateProduct))
productRouter.delete("/deleteproduct/:productId",errhandle.handle(productController.deleteProduct))
//export the productRouter
module.exports=productRouter