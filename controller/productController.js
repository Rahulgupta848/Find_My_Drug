const { codes } = require("../constants");
const drugs = require("../modals/drugsModal");

const fetchProducts = async (req, res) => {

     try {
          const { product, pinCode } = req.body;
          if (!product || !pinCode) {
               return res.status(codes.MISSING_FIELDS).json({
                    message: 'required fields are missing',
                    success: false
               })
          }

          const allDrugs = await drugs.find({ drugName: { $regex: `${product}` ,$options:"i"} })
          .populate({
               path:'pharmacy',
               match:{pincode:pinCode}
          })

          return res.status(200).json({
               status: true,
               data: allDrugs
          })
     } catch (error) {
          return res.status(codes.INT_SERVER_ERR), json({
               message: "Internal server error",
               success: false
          })
     }
}

module.exports = {
     fetchProducts
}