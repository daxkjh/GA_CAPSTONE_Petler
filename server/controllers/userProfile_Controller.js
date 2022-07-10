const router = require("express").Router();
const { reviews } = require("../server");
const prisma = require("../server");

//###################################
//######    USER'S PETS      ########
//###################################
// CREATE
router.post("/pet/:id", async (req, res) => {
    const {id} = req.params
    try {
        const ownerID = await prisma.userProfile.findUnique({where:{userId:id}})
        const currentpet = await prisma.pets.create({
            data: {
                name: req.body.name,
                type: req.body.type,
                breed: req.body.breed,
                birth: req.body.birth,
                image: req.body.image,
                sterilized: req.body.sterilized,
                size: req.body.size,
                userProfileId: ownerID.id
            }
        })
        res.status(200).json({status:"success", msg:"Pet Created!", data: currentpet})
       
    } catch (error) {
        res.status(400).json({status:"Failed", msg:"Pet Creation Failed", data: error})
    }
});

//UPDATE
router.put("/pet/:id", async (req, res) => {
    const {id} = req.params
    
    try {
        const currentpet = await prisma.pets.updateMany({
            where: { owner : { userId : id },
                    id : req.body.id },
                    data:{
                        name: req.body.name,
                        type: req.body.type,
                        breed: req.body.breed,
                        birth: req.body.birth,
                        image: req.body.image,
                        sterilized: req.body.sterilized,
                        size: req.body.size,
                    }
        })
        res.status(200).json({status:"Success", msg:"Pet UPdated", data:currentpet})
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
    const {id} = req.params
    
    try {
        const currentpet = await prisma.pets.deleteMany({
            where: { owner : { userId : id },
                    id : req.body.id },
                 
        })
        res.status(200).json({status:"Success", msg:"Pet Updated", data:currentpet})
    } catch (error) {
        res.status(400).json({status:"Failed", msg: "Create Pet failed"})
    }
});

module.exports = router