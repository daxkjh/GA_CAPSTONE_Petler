const { json } = require("body-parser");
const { PrismaClient } = require('@prisma/client');
const cors = require("cors")
const prisma = new PrismaClient();
module.exports = prisma
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dax-ga-sei36', 
    api_key: '887198321937621', 
    api_secret: 'utEOWgDrspFvhTwAcOavkTBZY2g' 
})



// express init
const express = require("express");
require('dotenv').config()
// const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
const PORT = process.env.PORT ?? 4000

const vendorController = require("./controllers/vendorController");
const bookingController = require("./controllers/bookingController")


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api/vendor", vendorController);
app.use("/api/booking", bookingController);
app.use("/api/user", require("./controllers/user_Controller"))
app.use("/api/userprofile", require("./controllers/userProfile_Controller"))


// express init
app.get("/api/", (req, res) => {
    res.send("welcome to Petler");
})

// express init
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})


app.post("/api/vendor/testupload/", async(req,res)=>{
    const image = req.body
    console.log("IMAGE",image)
    // res.send("hi")
    try {
        const url = await cloudinary.uploader.upload(image[0], function(error, result) {console.log(result, error)});
        res.status(200).json({msg:"success", data: url})
      } catch (error) {
        res.status(400).json({ status: "failed", data: error });
      }
})