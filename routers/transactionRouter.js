const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/create", transactionController.checkout);
router.get("/", transactionController.getLastCheckout);

module.exports = router;
