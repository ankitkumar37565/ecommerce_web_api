const jwt=require("jsonwebtoken")
const User=require("../models/user")
require("dotenv").config()
exports.loginVerify=async function(req,res,next){
 const header=req.header("Authorization").replace("Bearer ","")
 if(typeof header!== undefined){
  const bearerToken=header.split(" ")[1]
   const {userId,exp}=await jwt.verify(bearerToken,process.env.jwtsecret)
  if(!userId||!exp){return res.json({mesaage:"invalid Token"})}
  let validToken=await User.findOne({_id:userId,"tokens.token":bearerToken})
  if(!validToken){return res.json({message:"invalid Token"})}
  if(exp<Date.now()/1000){return res.json({message:"the token has expired"})}
  const user=await User.findOne({_id:userId})
  if(!user){ return res.json({message:"user does not exist"})}
  req.user=user
  req.token=bearerToken
  next()
 }
 else{
  res.json({message:"please provide bearer token"})
 }
}