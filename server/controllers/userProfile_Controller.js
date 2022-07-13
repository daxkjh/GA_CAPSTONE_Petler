const router = require("express").Router();
const { reviews } = require("../server");
const prisma = require("../server");
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dax-ga-sei36', 
    api_key: '887198321937621', 
    api_secret: 'utEOWgDrspFvhTwAcOavkTBZY2g' 
})

//###################################
//######    USER'S PETS      ########
//###################################
// CREATE
router.post("/pet/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const imageurl = await cloudinary.uploader.upload( req.body.data, {folder: "pet"} )
        const currentpet = await prisma.pets.create({
            data: {
                name: req.body.name,
                type: req.body.type,
                breed: req.body.breed,
                birth: req.body.birth,
                image: imageurl.secure_url,
                sterilized: req.body.sterilized,
                size: req.body.size,
                userProfileId: id
            }
        })
        res.status(200).json({status:"success", msg:"Pet Created!", data: currentpet})
       
    } catch (error) {
        res.status(400).json({status:"Failed", msg:"Pet Creation Failed", data: error})
    }
});

//UPDATE
router.put("/pet/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    // console.log("DATA",req.body.data)
    const petID = parseInt(req.body.id)
    // console.log("ID", id, petID)
    try {
        const imageurl = await cloudinary.uploader.upload( req.body.data, {folder: "pet"} )
        // console.log("SECURED",imageurl.secure_url)
        const currentpet = await prisma.pets.updateMany({
            where: { userProfileId : id ,
                    id : petID },
                    data:{
                        name: req.body.name,
                        type: req.body.type,
                        breed: req.body.breed,
                        birth: req.body.birth,
                        image: imageurl.secure_url,
                        sterilized: req.body.sterilized,
                        size: req.body.size,
                    }
        })
        console.log(req.body.birth)
        console.log("CURRENT PET",currentpet)
        res.status(200).json({status:"Success", msg:"Pet Updated", data: currentpet})
        // res.send(`hello${id}`)
    } catch (error) {
        res.status(400).json({status:"Failed", msg: "Create Pet failed"})
    }
});


//READ ONE
router.get("/pet/:id", async (req, res) => {
    const {id} = req.params
    
    try {
        const currentpet = await prisma.pets.findMany({
            where: { owner : { userId : id },
                    id : req.body.id },
                 
        })
        res.status(200).json({status:"Success", msg:"Pet UPdated", data:currentpet})
        // res.send(`hello${id}`)
    } catch (error) {
        res.status(400).json({status:"Failed", msg: "Create Pet failed"})
    }
});

//DELETE ONE
router.delete("/pet/:id", async (req, res) => {
    const id = parseInt( req.params.id )
    console.log("ID", id ,req.body.id )
    try {
        const currentpet = await prisma.pets.delete({
            where: { id : req.body.id },
                 
        })
        res.status(200).json({ status:"Success", msg:"Pet DELETED", data : currentpet })
    } catch (error) {
        res.status(400).json({status:"Failed", msg: "Create Pet failed"})
    }
});

module.exports = router