const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () =>{
     mongoose.connect(process.env.MONGO_URI,{
          useNewUrlParser: true,  
     }).then(()=>{
          console.log('database connected sucessfully');
     }).catch((err)=>{
          console.log('error in connecting  to the database : '+ err);
          process.exit(1);
     })
}

module.exports = {
     connectDB
}