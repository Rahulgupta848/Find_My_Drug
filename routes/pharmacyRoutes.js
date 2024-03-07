const express = require("express");
const { addItems ,updateItem, getMyPharmacyItems} = require("../controller/pharmacyController");
const { isPharmacy, auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/additem', auth, isPharmacy, addItems);
router.put('/updateitem', auth, isPharmacy, updateItem);
router.get('/getmydrugs',auth, isPharmacy, getMyPharmacyItems);

module.exports = router;
