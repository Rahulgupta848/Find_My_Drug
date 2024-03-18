const { codes } = require("../constants");
const drugs = require("../modals/drugsModal");
const pharmacy = require("../modals/pharmacyModal");

const addItems = async (req, res) => {
     try {
          const pharmacyId = req.userData.id;
          const { drugName, quantity } = req.body;

          if (!drugName || !quantity) { return res.status(codes.MISSING_FIELDS).json({ success: false, message: 'required fields are missing' }) }
          const NdrugName = drugName.toLowerCase();
          const query = { $and: [{ drugName: NdrugName }, { pharmacy: pharmacyId }] };
          const update = { $inc: { quantity: parseInt(quantity) } };
          const options = {
               upsert: true,
               new: true,
          }

          const newDrug = await drugs.findOneAndUpdate(query, update, options);

          if (newDrug._id) {
               const query = { _id: pharmacyId };
               const update = { $addToSet: { myDrugs: newDrug._id } };
               await pharmacy.updateOne(query, update);
          }

          return res.status(codes.SUCCESS).json({
               message: "Item added successfully!",
               success: true,
               data: newDrug
          })


     } catch (error) {
          console.log("error occoured in catch block", error);
          return res.status(codes.INT_SERVER_ERR).json({
               success: false,
               message: 'Internal server error'
          })
     }
}

const updateItem = async (req, res) => {
     try {
          const pharmacyId = req.userData.id;
          const {drugId, quantity } = req.body;
          if(!drugId || !quantity){
               return res.status(codes.MISSING_FIELDS).json({
                    message:'required fields are missing',
                    success:false
               })
          }

          const query = { $and: [{ _id: drugId }, { pharmacy: pharmacyId }] };
          const update = {quantity: quantity};
          const options = {
               new: true,
          }

          const updatedDrug = await drugs.findOneAndUpdate(query, update, options);
          return res.status(codes.SUCCESS).json({
               success: true,
               message: "Item has been updated.",
               data: updatedDrug
          })

     } catch (error) {
          console.log("error occoured in catch block", error);
          return res.status(codes.INT_SERVER_ERR).json({
               success: false,
               message: 'Internal server error'
          })
     }
}

const getMyPharmacyItems = async(req,res)=>{
     try {
          const pharmacyId = req.userData.id;
          const allitems = await pharmacy.findOne({_id:pharmacyId}).select("myDrugs").populate('myDrugs');
          return res.status(200).json({
               success:true,
               count:allitems?.myDrugs?.length,
               data:allitems,
          })
     } catch (error) {
          return res.status(codes.INT_SERVER_ERR).json({
               success: false,
               message: 'Internal server error'
          })
     }
}

const deletePharmacyItem =async(req,res)=>{
     try {
          const {drugId} = req.body;
          const pharmacyId = req.userData.id;

          try {
               const query = { pharmacy: pharmacyId };
               const update = {$pull:{myDrugs:{_id : drugId}}};
               const res1 = await drugs.findByIdAndDelete(drugId);
               const res2 = await pharmacy.update(query,update);

               return res.status(codes.SUCCESS).json({
                    success:true,
                    message:"Item deleted sucessfully",
                    data:{...res1,...res2}
               })
          } catch (error) {
               return res.status(codes.INT_SERVER_ERR).json({
                    success: false,
                    message: 'Internal server error'
               })
          }
          
     } catch (error) {
          return res.status(codes.INT_SERVER_ERR).json({
               success: false,
               message: 'Internal server error'
          })
     }
}

module.exports = {
     addItems,
     updateItem,
     getMyPharmacyItems,
     deletePharmacyItem
}