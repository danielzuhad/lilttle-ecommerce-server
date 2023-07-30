const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/create", transactionController.checkout);
router.get("/", transactionController.getAll);
router.get("/:id", transactionController.getById);

module.exports = router;
