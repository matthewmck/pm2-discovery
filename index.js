const express = require('express');
require("dotenv").config();
const app = express();

app.get('/', (req, res) => {
  res.send("Node test home page, change has been made");
})

app.listen(process.env.PORT);