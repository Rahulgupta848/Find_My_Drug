const express = require("express");
const { addItems ,updateItem, getMyPharmacyItems, deletePharmacyItem} = require("../controller/pharmacyController");
const { isPharmacy, auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/additem', auth, isPharmacy, addItems);
router.put('/updateitem', auth, isPharmacy, updateItem);
router.get('/getmydrugs',auth, isPharmacy, getMyPharmacyItems);
router.put('/remove',auth,isPharmacy,deletePharmacyItem);

module.exports = router;
