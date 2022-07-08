const router = require("express").Router();
const { reviews } = require("../server");
const prisma = require("../server");

//###################################
//######    USER'S PETS      ########
//###################################

router.post("/pet/:id", async (req, res) => {
    const {id} = req.params
    try {
        const currentpet = await prisma.pets.findMany({
            where: { owner : { userId : id } }
        })
        res.send(currentpet)
        // res.send(`hello${id}`)
    } catch (error) {
        res.send(error)
    }

    
});

module.exports = router