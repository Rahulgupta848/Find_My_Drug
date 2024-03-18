const jwt = require("jsonwebtoken");
const { roles, codes } = require("../constants");
require('dotenv').config();

const auth = (req, res, next) => {
     try {
          const token = req.header("Authorization")?.replace("Bearer ", "");
          if (!token) {
               return res.status(codes.AUTH_MISS).json({
                    message: 'Unauthorized request',
                    success: false
               })
          }

          try {
               const decode = jwt.verify(token, process.env.JWT_SECRET);
               console.log(decode)
               req.userData = decode;
               next();
          } catch (error) {
               return res.status(codes.TOKEN_EXP).json({
                    message:'token expired',
                    success:false
               })
          }

     } catch (error) {
          console.log(error)
          return res.status(codes.INT_SERVER_ERR).json({
               message: 'Internal server error',
               success: false
          })
     }
}

const isPharmacy = (req, res, next) => {
     const userType = req.userData.role;
     if (userType !== roles.pharmacy) {
          return res.status(codes.UNAUTHORIZED), json({
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