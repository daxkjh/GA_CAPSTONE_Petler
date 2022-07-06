const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const vendors = await prisma.vendor.findMany();
  res.send(vendors);
});

router.post("/", async (req, res) => {
  const data = req.body;
  async function main() {
    await prisma.vendor.create({ data });
    const allVendors = await prisma.vendor.findMany();
    res.send(allVendors);
    // console.log(allVendors);
  }
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  num = parseInt(id);
  const data = req.body;
  console.log(num);
  async function main() {
    const vendor = await prisma.vendor.update({
      where: {
        id: num,
      },
      data,
    });
    console.log(vendor);
  }
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  num = parseInt(id);
  async function main() {
    const deleteVendor = await prisma.vendor.delete({
      where: {
        id: num,
      },
    });
    res.send(deleteVendor);
  }
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

module.exports = router;
