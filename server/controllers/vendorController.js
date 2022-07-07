const express = require("express");
const router = express.Router();
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const prisma = require("../server");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10

//get for test
router.get("/", async (req, res) => {
  const vendors = await prisma.vendor.findMany();
  res.send(vendors);
});

//sign up
router.post("/signup", async (req, res) => {
  const vendorData = { email: req.body.email, 
    password: await bcrypt.hash(req.body.password, saltRounds) }
    console.log(vendorData)
  try {
    const vendor = await prisma.vendor.create({ data: vendorData });
    res.send({ status: "success", data: vendor })
  } catch (error) {
    res.send({ status: "failed", data: error })
  }  
});

// login
router.post("/login", async (req, res) => {
  // const data = req.body
  const { email, password } = req.body
  const vendorLogin = await prisma.vendor.findUnique({ where: { email: email } });
  // console.log(vendorLogin)
   if (vendorLogin === null ) {
    res.send({status: "failed", data: "Username not found"})
  } else {
    if (bcrypt.compareSync(password, vendorLogin.password )) {
      const accessToken = jwt.sign({email, role:"vendor"}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h",})
      res.json({ accessToken: accessToken})
    } else {
      res.send({ status: "failed", data: "Incorrect email or Password" });
    }
  }
 })

// Auth
const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth)
  if (!auth) {
    res.status(401).send({ status: "error", msg: "No header" });
  }
  const accessToken = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      res.locals.vendor = decoded;
      next();
    } else {
      res.status(401).send({ status: "error", msg: "Decode check fail" });
    }
  } catch (err) {
    res.status(401).send({ status: "error", msg: "No access" });
  }
};

// vendor profile create

router.post("/profile", async (req, res) => {
  const profile  = req.body;
  try {
    const vendorProflie = await prisma.profile.create( { data: profile }
  );
    res.send(vendorProflie)
  } catch (error) {
    res.send(error)
    // res.send({ status: "failed", data: error })
  }  
});

// Secret Route
router.get("/secret", isAuth, (req, res) => {
  res.send({ status: "ok", msg: "it's a secret" });
});


//   const data = req.body;
//   const vendorLogin = await prisma.vendor.findOne({ data });
//   if (vendorLogin === null) {
//     res.send({ status: "fail", data: "Username not found" });
//   } else {
//     const match = await bcrypt.compare(data.password, vendorLogin.password)
//     if (match) {
//       res.json("accessToken")
//       } else {
//           res.status(404).json({status:"Failed", msg:"Incorrect User or Password"})
//       }
//     } else {
//       res.send({ status: "error", data: "password fail" });
//     }
//   }
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  num = parseInt(id);
  const data = req.body;
  // console.log(num);
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
