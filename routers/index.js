const express = require("express");
const router = express.Router();
const productRouter = require("./productRouter");
const transactionRouter = require("./transactionRouter");

router.use("/api/product", productRouter);
router.use("/api/transaction", transactionRouter);

module.exports = router;
