const mongoose=require("mongoose")
require("dotenv").config()
exports.connectdb=async function(){
 try{
  await mongoose.connect(process.env.uri).then(()=>{console.log("connected to db")})
 }catch(err){console.log(err)}
}
