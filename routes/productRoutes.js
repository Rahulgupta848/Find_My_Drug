const express = require("express");
const { fetchProducts } = require("../controller/productController");
const router = express.Router();

router.post('/getProducts',fetchProducts);

module.exports = router;