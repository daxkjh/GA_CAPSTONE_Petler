const { json } = require("body-parser");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// express init
const express = require("express");
require('dotenv').config()
// const cors = require('cors')

// express init
const app = express();

const PORT = process.env.PORT ?? 4000

const vendorController = require("./controllers/vendorController");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/vendors", vendorController);
// app.use(cors())

// express init
app.get("/api/", (req, res) => {
    res.send("welcome to Petler");
})

// express init
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})