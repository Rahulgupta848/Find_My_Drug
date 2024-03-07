const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
     const token = req.header("Authorization").replace("Bearer ", "");
     if (!token) {
          return res.status(405).json({
               message: 'Unauthorized request',
               success: false
          })
     }
     try {
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          req.userData = decode;
          next();

     } catch (error) {
          return res.status(500).json({
               message: 'Internal server error',
               success: false
          })
     }
}

const isPharmacy = (req, res, next) => {
     const userType = req.userData.role;
     if (userType !== 'PHARMACY') {
          return res.status(406), json({
               message: "You are not authorised to perform this action",
               success: false
          })
     }
     next();
}


module.exports = {
     auth,
     isPharmacy
}