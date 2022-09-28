const mongoose=require("mongoose")
const paymentSchema=mongoose.Schema({
user:{
 type:mongoose.Schema.Types.ObjectId,
 required:true,
 ref:"User"
},
amount:{
 type:Number,
 required:true
},
status:{
 type:Boolean,
 default:false
}
})
const Payment=mongoose.model("Payment",paymentSchema)
module.exports=Payment
