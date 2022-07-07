const router = require("express").Router();
const prisma = require("../server");

router.get("/", async (req, res) => {
    res.send("hello World")
    
    
});

module.exports = router