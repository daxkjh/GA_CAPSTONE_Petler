const router = require("express").Router();
const prisma = require("../server");
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

//####### USER SIGNING UP EMAIL CHECK #########
router.get("/signingup", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select : {id: false,email: true, password:false}});
    console.log(users)
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ## READ All User Profile
router.get("/profile/", async (req, res) => {
  try {
    const userProfiles = await prisma.userProfile.findMany({});
    res.send(userProfiles);
  } catch (error) {
    res.json({
      status: "failed",
      message: "Unable to fetch user profile data",
    });
  }
});

//READ User Profile - Profile Page on Load
router.get("/profile/:id/", async (req, res) => {
  try {
    const { id } = req.params;
   
    console.log(id)
    const user = await prisma.user.findUnique({ 
      where: { id : id },include:{profile:true} });
      console.log(user)
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ### CREATE User
router.post("/", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
      },
    });
    const profile = await prisma.userProfile.create({
      data: { userId: user.id },
    });
    res
      .status(200)
      .json({ status: "success", msg: "User Created", data: user });
  } catch (error) {
    res.status(400).send(error);
  }
});

//USER PROFILE

router.put("/editprofile", async (req,res)=>{
  try {
    const user = await prisma.userProfile.update({
      where :{ userId: "cd2f2f36-e9ac-4175-a44d-a84b6f575cb3" },
      data: {
        name: "test",
        address: "test address",
        description: "test description",
        image: "someurl.com",
      }
    })
  } catch (error) {
    res.status(400).send(error)
  }
  


})


// ### USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(404).json({ message: "Email or Password Incorrect" });
    } else {
      const match = bcrypt.compare(user.password, req.body.password);
      if (!match) {
        res.status(404).json({ message: "Email or Password Incorrect" });
      } else {
        const id = user.id;
        const accessToken = await jwt.sign(
          { id, role: "user" },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ accessToken: accessToken });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

// ### UPDATE User WIP
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

// ### DELETE User WIP

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
