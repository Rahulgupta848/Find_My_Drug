const { roles } = require("../constants");
const customers = require("../modals/customerModal");
const pharmacy = require("../modals/pharmacyModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
     try {
          const { name,
               email,
               password,
               role,
               mobileNo,
               country,
               state,
               city,
               pincode,
               addressLine1,
               pharmacyName,
          } = req.body;

          if (role === roles.customer) {
               if (!name || !email || !password || !mobileNo) {
                    return res.status(400).json({
                         message: "Required fileds are missing",
                         success: false
                    })

               }
               const userExist = await customers.findOne({ $or: [{ email }, { mobileNo }] });
               if (userExist) {
                    return res.status(401).json({
                         success: false,
                         message: "user already exists"
                    })
               }

               try {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    if (hashedPassword) {
                         const user = await customers.create({ email: email, name: name, password: hashedPassword, mobileNo: mobileNo });
                         const obj = {
                              email: user.email,
                              name: user.name,
                              mobileNo: user.mobileNo
                         }

                         return res.status(200).json({
                              success: true,
                              message: 'User created successfully',
                              data: obj
                         })
                    }

               } catch (error) {
                    return res.status(500), json({
                         message: "Internal server error",
                         success: false
                    })
               }
          } else if (role === roles.pharmacy) {
               if (!email || !name || !password || !mobileNo || !country || !state || !city || !pincode || !addressLine1 || !pharmacyName) {
                    return res.status(400).json({
                         message: "Required fileds are missing",
                         success: false
                    })
               }

               const userExist = await pharmacy.findOne({ $or: [{ email }, { mobileNo }] });
               if (userExist) {
                    return res.status(401).json({
                         success: false,
                         message: "user already exists"
                    })
               }
               try {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    if (hashedPassword) {
                         const user = await pharmacy.create({
                              email: email,
                              name: name,
                              password: hashedPassword,
                              mobileNo: mobileNo,
                              country: country,
                              state: state,
                              city: city,
                              pincode: pincode,
                              addressLine1: addressLine1,
                              pharmacyName: pharmacyName
                         });
                         const obj = {
                              email: user.email,
                              name: user.name,
                              mobileNo: user.mobileNo,
                              pharmacyName: user.pharmacyName,
                         }

                         return res.status(200).json({
                              success: true,
                              message: 'pharmacy created successfully',
                              data: obj
                         })
                    }

               } catch (error) {
                    return res.status(500), json({
                         message: "Internal server error",
                         success: false
                    })
               }

          } else {
               return res.status(400).json({
                    message: "Invalid input data",
                    success: false
               })
          }
     } catch (error) {
          return res.status(500), json({
               message: "Internal server error",
               success: false
          })
     }

}

const signIn = async (req, res) => {
     try {
          const { email, password, role } = req.body;
          if (!email || !password) {
               return res.status(400).json({
                    message: 'Required fields are empty',
                    success: false
               })
          }

          if (role) {
               let user = role === roles.customer ? await customers.findOne({ email }) : await pharmacy.findOne({ email });
               if (!user) {
                    return res.status(401).json({
                         message: "User does not exist",
                         success: false
                    })
               }

               try {
                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if (!isValidPassword) {
                         return res.status(401).json({
                              message: "Email and password does not match",
                              success: false
                         })
                    }

                    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    const data = {
                         name: user.name,
                         email: user.email,
                         role: user.role
                    }
                    if(role === roles.pharmacy){
                         data.pharmacyName = user.pharmacyName
                    }
                    return res.status(200).json({
                         token: token,
                         message: 'Logged in successfully',
                         data:data
                    })


               } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                         message: "Internal server error",
                         success: false
                    })
               }
          } else {
               return res.status(400).json({
                    message: "Invalid request",
                    success: false
               })
          }

     } catch (error) {
          return res.status(500).json({
               message: "Internal server error",
               success: false
          })
     }

}

module.exports = {
     signUp,
     signIn
}