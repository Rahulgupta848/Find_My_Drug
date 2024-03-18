const { roles, codes } = require("../constants");
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
                    return res.status(codes.MISSING_FIELDS).json({
                         message: "Required fileds are missing",
                         success: false
                    })

               }
               const userExist = await customers.findOne({ $or: [{ email }, { mobileNo }] });
               if (userExist) {
                    return res.status(codes.BAD_REQUEST).json({
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

                         return res.status(codes.SUCCESS).json({
                              success: true,
                              message: 'User created successfully',
                              data: obj
                         })
                    }

               } catch (error) {
                    return res.status(codes.INT_SERVER_ERR), json({
                         message: "Internal server error",
                         success: false
                    })
               }
          } else if (role === roles.pharmacy) {
               if (!email || !name || !password || !mobileNo || !country || !state || !city || !pincode || !addressLine1 || !pharmacyName) {
                    return res.status(codes.MISSING_FIELDS).json({
                         message: "Required fileds are missing",
                         success: false
                    })
               }

               const userExist = await pharmacy.findOne({ $or: [{ email }, { mobileNo }] });
               if (userExist) {
                    return res.status(codes.BAD_REQUEST).json({
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

                         return res.status(codes.SUCCESS).json({
                              success: true,
                              message: 'pharmacy created successfully',
                              data: obj
                         })
                    }

               } catch (error) {
                    return res.status(codes.INT_SERVER_ERR), json({
                         message: "Internal server error",
                         success: false
                    })
               }

          } else {
               return res.status(codes.BAD_REQUEST).json({
                    message: "Invalid input data",
                    success: false
               })
          }
     } catch (error) {
          return res.status(codes.INT_SERVER_ERR), json({
               message: "Internal server error",
               success: false
          })
     }

}

const signIn = async (req, res) => {
     try {
          const { email, password, role } = req.body;
          if (!email || !password) {
               return res.status(codes.MISSING_FIELDS).json({
                    message: 'Required fields are empty',
                    success: false
               })
          }

          if (role) {
               let user = role === roles.customer ? await customers.findOne({ email }) : await pharmacy.findOne({ email });
               if (!user) {
                    return res.status(codes.BAD_REQUEST).json({
                         message: "User does not exist",
                         success: false
                    })
               }

               try {
                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if (!isValidPassword) {
                         return res.status(codes.BAD_REQUEST).json({
                              message: "Email and password does not match",
                              success: false
                         })
                    }

                    const jwtPayload = {
                         id: user._id,
                         role: user.role,
                    }

                    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2hr' });
                    const data = {};
                    if (role === 'CUSTOMER') {
                         data.token = token;
                         data.id = user._id;
                         data.name = user.name;
                         data.email = user.email;
                         data.mobileNo = user.mobileNo;
                         data.role = user.role;
                    } else {
                         data.id = user._id;
                         data.token = token;
                         data.name = user.name;
                         data.pharmacyName = user.pharmacyName;
                         data.email = user.email;
                         data.mobileNo = user.mobileNo;
                         data.role = user.role;
                         data.country = user.country;
                         data.state = user.state;
                         data.city = user.city;
                         data.pincode = user.pincode;
                         data.addressLine1 = user.addressLine1;
                    }
                    if (role === roles.pharmacy) {
                         data.pharmacyName = user.pharmacyName
                    }
                    return res.status(codes.SUCCESS).json({
                         message: 'Logged in successfully',
                         success: true,
                         data: data
                    })


               } catch (error) {
                    console.log(error);
                    return res.status(codes.INT_SERVER_ERR).json({
                         message: "Internal server error",
                         success: false
                    })
               }
          } else {
               return res.status(codes.BAD_REQUEST).json({
                    message: "Invalid request",
                    success: false
               })
          }

     } catch (error) {
          return res.status(codes.INT_SERVER_ERR).json({
               message: "Internal server error",
               success: false
          })
     }

}

const fetchUser = async (req, res) => {
     try {
          const userId = req.userData.id;
          const role = req.userData.role;
          const token = req.header("Authorization")?.replace("Bearer ", "");
          const data = role === "CUSTOMER" ? await customers.findById(userId) : await pharmacy.findById(userId);

          let payload = {};
          if (role === 'CUSTOMER') {
               payload.id = data._id;
               payload.name = data.name;
               payload.email = data.email;
               payload.mobileNo = data.mobileNo;
               payload.role = data.role;
               payload.token = token;
          } else {
               payload.id = data._id;
               payload.name = data.name;
               payload.pharmacyName = data.pharmacyName;
               payload.email = data.email;
               payload.mobileNo = data.mobileNo;
               payload.role = data.role;
               payload.country = data.country;
               payload.state = data.state;
               payload.city = data.city;
               payload.pincode = data.pincode;
               payload.addressLine1 = data.addressLine1;
               payload.token = token;
          }

          return res.status(codes.SUCCESS).json({
               success: true,
               message: "Fetched User Successfully!",
               data: payload
          })

     } catch (error) {
          console.log(error)
          return res.status(codes.INT_SERVER_ERR).json({
               message: "Internal server error",
               success: false
          })
     }
}

module.exports = {
     signUp,
     signIn,
     fetchUser
}