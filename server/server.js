const { json } = require("body-parser");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma

// express init
const express = require("express");
require('dotenv').config()
// const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
const PORT = process.env.PORT ?? 4000

const vendorController = require("./controllers/vendorController");


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/vendors", vendorController);
// app.use(cors())
app.use("/api/user", require("./controllers/user_Controller"))
app.use("api/userprofile", require("./controllers/userProfile_Controller"))





// express init
app.get("/api/", (req, res) => {
    res.send("welcome to Petler");
})

// express init
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})