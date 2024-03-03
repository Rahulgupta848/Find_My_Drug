const mongoose = require("mongoose");
const { roles } = require("../constants");

const schema = new mongoose.Schema({
     name:{
          type:String,
          require:true,
     },
     email:{
          type:String,
          require:true
     },
     password:{
          type:String,
          require:true,
     },
     createdAt:{
          type:Date,
          default:Date.now()
     },
     updatedAt:{
          type:Date,
          default:Date.now()
     },
     mobileNo:{
          type:Number,
          require:true
     },
     role:{
          type:String,
          default:roles.customer
     }
})

module.exports = mongoose.model("customers",schema);