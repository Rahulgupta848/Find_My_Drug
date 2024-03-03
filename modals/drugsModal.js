const mongoose = require("mongoose");

const schema = new mongoose.schema({
     drugName: {
          type:String,
          require:true
     },
     quantity:{
          type:Number,
          require:true
     }
})

module.exports = mongoose.model("drugs",schema);