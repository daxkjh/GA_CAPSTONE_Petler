const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
     const vendors = await prisma.vendor.findMany()
     res.send(vendors)
})

router.post("/", async (req, res) => {    
    async function main() {
        await prisma.vendor.create({
            data: {
                email: 'doglover@gmail.com',
                password: '123',
              }
        });
    const allVendors = await prisma.vendor.findMany();
    res.send(allVendors)
    console.log(allVendors);
    }
    
    main()
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

})

router.put("/:id", (req, res) => {
    res.send("update check!!")
})

router.delete("/:id", (req, res) => {
    res.send("Yo! delete!!")
})


module.exports = router;