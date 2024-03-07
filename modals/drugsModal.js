const mongoose = require("mongoose");

const schema = new mongoose.Schema({
     drugName: {
          type: String,
          require: true,
          lowercase:true
     },
     quantity: {
          type: Number,
          require: true,
          default:0
     },
     pharmacy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'pharmacy'
     }
})

module.exports = mongoose.model("drugs", schema);