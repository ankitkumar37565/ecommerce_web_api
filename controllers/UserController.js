const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.signup=async function(req,res,next){
 let {name,email,password,age,mobile,address}=req.body
 let hashedPassword=await bcrypt.hash(password,10)
 let newuser=new User({name,email,password:hashedPassword,age,mobile,address})
 await newuser.save()
 res.json({data:newuser})
}
exports.login=async function(req,res,next){
 let{email,password}=req.body
 let user=await User.findOne({"email":email})
 if(!user){return res.json({message:"user not found"})}
 let validatePassword=await bcrypt.compare(password,user.password)
 if(!validatePassword){return res.json({message:"password incorrect"})}
 let newtoken=jwt.sign({userId:user._id},process.env.jwtsecret,{expiresIn:"1d"})
 user.tokens=await user.tokens.concat({token:newtoken})
 await user.save()
 res.json({user})
}
exports.getLoggedInUser=async function(req,res,next){
let user=req.user
return res.json({user})
}
exports.updateUser=async function(req,res,next){
 const allowedUpdates=["name","email","password","age","mobile","address"]
 const updatesGiven=Object.keys(req.body)
 const isVaidUpdates=updatesGiven.every((update)=>allowedUpdates.includes(update))
if(!isVaidUpdates){return res.json({message:"invalid updates"})}
if(req.body.password){req.body.password=await bcrypt.hash(req.body.password,10)}
await User.findOneAndUpdate({_id:req.user._id},{$set:req.body})
return res.json({message:"user updated"})
}
exports.logout=async function(req,res,next){
 const user=req.user
 user.tokens=await user.tokens.filter((token)=>{
  return token.token!== req.token
 })
 await user.save()
 return res.json({message:"successfully loggedout"})
}