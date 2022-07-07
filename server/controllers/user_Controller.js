const router = require("express").Router();

const prisma = require("../server")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//### GET ALL USER

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
  }
});
//Show User
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: id } });
  } catch (error) {
    res.status(400).send(error);
  }
});

// ### CREATE User
router.post("/", async (req, res) => {
  try {
    
    const user = await prisma.user.create({data:{
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds),
    }});
    const profile = await prisma.userProfile.create({data:{userId: user.id}})
    res
      .status(200)
      .json({ status: "success", msg: "User Created", data: user });
  } catch (error) {
    res.status(400).send(error);
  }
});

// ### UPDATE User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  num = parseInt(id);
  const data = req.body;
  console.log(num);
  async function main() {
    const updateUser = await prisma.user.update({
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

// ### DELETE User

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  num = parseInt(id);
  async function main() {
    const deleteUser = await prisma.user.delete({
      where: {
        id: num,
      },
    });
    res.send(deleteUser);
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
