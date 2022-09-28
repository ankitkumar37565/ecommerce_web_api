const Product=require("../models/product")
exports.createProduct=async function(req,res,next){
 let{name,quantity}=req.body
 let product=new Product({name,quantity})
await product.save()
return res.json({product})
}
exports.getProducts=async function(req,res,next){
 let products=await Product.find({})
 return res.json({products})
}
exports.updateProduct=async function(req,res,next){
 let allowedUpdates=["quantity","name"]
 let updatesGiven=Object.keys(req.body)
 const isVaidUpdates=await updatesGiven.every((update)=>allowedUpdates.includes(update))
 if(!isVaidUpdates){return res.json({message:"invalid updates"})}
 if(! await Product.findById({_id:req.params.productId})){return res.json({message:"product does not exist"})}
 await Product.findOneAndUpdate({_id:req.params.productId},{$set:req.body})
return res.json({message:"product updated"})
}
exports.deleteProduct=async function(req,res,next){
let product=await Product.findById({_id:req.params.productId})
if(!product){return res.json({message:"product does not exist"})}
await Product.findOneAndDelete({_id:req.params.productId})
return res.json({message:"product deleted"})
}