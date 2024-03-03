const mongoose = require("mongoose");
const { roles } = require("../constants");

const schema = new mongoose.Schema({
     name: {
          type: String,
          require: true,
     },
     pharmacyName: {
          type: String,
          require: true,
     },
     email: {
          type: String,
          require: true
     },
     password: {
          type: String,
          require: true,
     },
     createdAt: {
          type: Date,
          default: Date.now()
     },
     updatedAt: {
          type: Date,
          default: Date.now()
     },
     mobileNo: {
          type: Number,
          require: true
     },
     role: {
          type: String,
          default: roles.pharmacy
     },
     country: {
          type: String,
          require: true
     },
     state: {
          type: String,
          require: true
     },
     city: {
          type: String,
          require: true
     },
     pincode: {
          type: String,
          require: true
     },
     addressLine1: {
          type: String,
          require: true
     },
     myDrugs: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "drugs"
          }
     ]
})

module.exports = mongoose.model("pharmacy", schema);