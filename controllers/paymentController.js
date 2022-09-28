const Payment=require("../models/payment")
exports.createPayment=async function(req,res,next){
 let{amount,status}=req.body
 let newPayment=new Payment({user:req.user._id,amount,status})
 newPayment.populate("user")
await newPayment.save()
res.json({newPayment})
}
exports.getPayment=async function(req,res,next){
 let payment=await Payment.findOne({_id:req.params.paymentId,user:req.user._id})
 if(!payment){return res.json({message:"payment does not exist"})}
 return res.json({payment})
}
exports.updatePayment=async function(req,res,next){
 let payment=await Payment.findOne({_id:req.params.paymentId,user:req.user._id})
 if(!payment){return res.json({message:"payment does not exist"})}
 let allowedupdates=["amount","status"]
 let updatesgiven=Object.keys(req.body)
 let isVaidUpdates=updatesgiven.every((update)=>allowedupdates.includes(update))
if(!isVaidUpdates){return res.json({message:"invalid updates"})}
await Payment.findOneAndUpdate({_id:req.params.paymentId},{$set:req.body})
return res.json({message:"payment updated"})
}
exports.deletePayment=async function(req,res,next){
 let payment=await Payment.findOne({_id:req.params.paymentId,user:req.user._id})
 if(!payment){res.json({message:"payment does not exist"})}
 await Payment.findOneAndDelete({_id:req.params.paymentId})
 return res.json({message:"payment deleted"})
}