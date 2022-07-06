const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const vendors = await prisma.vendor.findMany()
    res.send(vendors)
})

router.post("/", (req, res) => {
    res.send("post check!!!!")
})

router.put("/:id", (req, res) => {
    res.send("update check!!")
})

router.delete("/:id", (req, res) => {
    res.send("Yo! delete!!")
})


module.exports = router;