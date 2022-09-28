const Order=require("../models/order")
exports.getAllOrders=async function(req,res,next){
let orders=await Order.find({"user":req.user._id})
return res.json({"orders":orders})
}
exports.getOrder=async function(req,res,next){
 let order=await Order.findOne({_id:req.params.orderId}).populate(["user","productId","payment"])
 if(!order){return res.json({message:"order does not exist"})}
return res.json({"order":order})
}
exports.createOrder=async function(req,res,next){
 let {productId,quantity}=req.body
 let user=req.user._id
 let order=new Order(req.body)
 order.user=user 
 await order.save()
 return res.json({message:"order created successfully"})
}
exports.updateOrder=async function(req,res,next){
 let allowedUpdates=["quantity","user","payment","delivered"]
 let updatesGiven=Object.keys(req.body)
 let isValidUpdates=await updatesGiven.every((update)=>allowedUpdates.includes(update))
if(!isValidUpdates){return res.json({message:"invalid updates given"})}
await Order.findOneAndUpdate({_id:req.params.orderId},{$set:req.body})
return res.json({message:"order updated successfully"})
}
exports.deleteOrder=async function(req,res,next){
 let order=await Order.findOne({_id:req.params.orderId})
 if(!order){return res.json({message:"order does not exist"})}
await Order.findByIdAndDelete({_id:req.params.orderId})
return res.json({message:"order deleted"})
}