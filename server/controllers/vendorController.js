const express = require("express");
const router = express.Router();
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const prisma = require("../server");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
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
    const vendorId = await prisma.profile.create({ data: {vendorId: vendor.id} });
    res.status(200).json({ status: "success", data: vendor })
  } catch (error) {
    res.status(400).json({ status: "failed", data: error })
  }  
}); 

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const vendorLogin = await prisma.vendor.findUnique({ where: { email: email } });
  // console.log(vendorLogin)
   if (vendorLogin === null ) {
    res.send({status: "failed", data: "Username not found"})
  } else {
    if (bcrypt.compareSync(password, vendorLogin.password )) {
      const accessToken = jwt.sign({vendorLogin, role:"vendor"}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h",})
      res.status(200).json({ accessToken: accessToken, data: vendorLogin })
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

// vendor profile show all for testing
router.get("/profile", async (req, res) => {
  try {
    const allProfile = await prisma.profile.findMany()
    res.send(allProfile)
  } catch (error) {
    res.send({status:401, error:error })
  }
})

// vendor profile show 
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vendorProfile = await prisma.profile.findUnique({
      where: {
          vendorId: id,
      },
      include: {
        details: true, 
        bookings: true,
        reviews: true,
        posts: true,
        services: true,
      },
    })
    
    res.send(vendorProfile)
  } catch (error) {
    res.send({status:401, error:error })
  }
})

// vendor profile update
router.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const profile  = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    intro: req.body.intro,          
    type: req.body.type,
    profilePic: req.body.profilePic,          
    start: req.body.start,
    end: req.body.end,
    details: { 
      create: {
      svcdsc: req.body.svcdsc,          
      petType: req.body.petType,
      petSize: {create: 
        {weight: req.body.petSize
        }},   
      area: {create: {
        north: true
      }}
    }}
  }
  console.log(profile)
  try {
    const vendorProflie = await prisma.profile.update({ 
      where: { vendorId: id },
      data: profile
  })
    res.status(200).json({data: vendorProflie})
  } catch (error) {
     res.status(400).json({ status: "failed", data: error })
  }  
});

// vendor acount delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProfile = await prisma.profile.delete({
      where: {
        vendorId: id,
      }
    })
    const deleteVendor = await prisma.vendor.delete({
      where: {
        id: id,
      }
    })
    res.send(deleteVendor);
  } catch (error) {
    res.send({status: "failed ", data: "something went wrong"})
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



module.exports = router;
