const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProduct);
router.post("/create", productController.addProduct);

module.exports = router;
