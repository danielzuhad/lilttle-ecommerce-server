require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routers/index");

app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listen In Port ${PORT}`);
});
