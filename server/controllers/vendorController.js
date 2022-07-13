const express = require("express");
const router = express.Router();
const prisma = require("../server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dax-ga-sei36', 
    api_key: '887198321937621', 
    api_secret: 'utEOWgDrspFvhTwAcOavkTBZY2g' 
})




const saltRounds = 10;

//get all vendors
router.get("/", async (req, res) => {
  try {
  const vendors = await prisma.profile.findMany({
    include: {  
      details: true,
      services: true
    }
  });
  res.status(200).json({ status: "success", data: vendors });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
});

//sign up
router.post("/signup", async (req, res) => {
  const vendorData = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, saltRounds),
  };
  // console.log(vendorData);
  try {
    const vendor = await prisma.vendor.create({ data: vendorData });
    const vendorProfile = await prisma.profile.create({
      data: { vendorId: vendor.id,
        name: req.body.name,
        type: req.body.type },
    });
    const vendorProfileDetails= await prisma.details.create({data: {profileId: vendorProfile.id}});
    const vendorProfileDetailsPetSize=await prisma.petSize.create({data:{detailsId:vendorProfileDetails.id}})
    const vendorProfileDetailsArea = await prisma.area.create({data:{detailsId:vendorProfileDetails.id}})
    res.status(200).json({ status: "success", data: vendor });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
});

// VENDOR PROFILE PIC UPLOAD
router.post("/upload/:id", async (req,res)=>{
   const id = parseInt(req.params.id);
   
  try {
    
    const {data} = req.body
  
    // console.log("IMAGE",image)
    const imageurl = await cloudinary.uploader.upload( data, {folder: "vendor"} )
    
    const imageUpload = await prisma.profile.update({where : {id : id}, 
      data : { profilePic : imageurl.secure_url
    }})
    res.status(200).json({msg:"success", data: imageUpload})
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }

})






//Vendor PASSWORD Change
router.put("/signup/:id", async (req, res) => {
  const { id } = req.params;
  const newPassword = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const vendor = await prisma.vendor.update({
      where: { id: id },
      data: { password: newPassword },
    });
    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendorLogin = await prisma.vendor.findUnique({
      where: { email: email },
    });
    // console.log(vendorLogin)
    if (!vendorLogin) {
      res.status(400).json({ status: "failed", data: "Username not found" });
    } else {
      const match = await bcrypt.compare(password, vendorLogin.password);
      if (match) {
        const id = vendorLogin.id;
        const accessToken = jwt.sign(
          { id, role: "vendor" },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .send({ accessToken: accessToken, data: vendorLogin.id });
      } else {
        res
          .status(400)
          .json({ status: "failed", data: "Incorrect email or Password" });
      }
    }
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
});

// Auth
const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  // console.log(auth);
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
    const allProfile = await prisma.profile.findMany({
    include:{ details : true}});
    res.status(200).json({ data:allProfile });
  } catch (error) {
    res.send({ status: 401, error: error });
  }
});

// vendor profile show
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vendorProfile = await prisma.profile.findUnique({
      where: {
        vendorId: id,
      },
      include: {
        details: {
          include: {
            petSize: true,
            area: true,
          },
        },
        bookings: true,
        reviews: true,
        posts: true,
        services: true,
      },
    });
    res.status(200).json({ status: "success", data: vendorProfile });
    // console.log(vendorProfile);
  } catch (error) {
    res.send({ status: 401, error: error });
  }
});

// vendor profile update
router.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // const vendor = await prisma.vendor.findUnique({
    //   where: { id: id },
    //   include : { profile : { include: { details : {include: {petSize: true, area:true}}}},
    //  }});
    // console.log("VENDOR", vendor);

    const vendorProfile = await prisma.profile.update({
      where: { vendorId: id },
      data: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        intro: req.body.intro,
        type: req.body.type,
        profilePic: req.body.profilePic,
        start: req.body.start,
        end: req.body.end,
        details: {
          update: {
        //     // where: { id:2 }, //one to many
        //     data: {
              svcdsc: req.body.svcdsc,
              petType: req.body.petType,
              petSize: {
                update: {
              // //     where: { id: 1 },
              // //     data: {
                    xs: req.body.xs,
                    s: req.body.s,
                    m: req.body.m,
                    l: req.body.l,
                    xl: req.body.xl,
                  },
                },
              
              area: {
                update: {
        // //       //     where: { id:1 },
        // //       //     data: {
                    north: req.body.north,
                    south: req.body.south,
                    east: req.body.east,
                    west: req.body.west,
                  },
                },
              },
        //     },
      //     },
        },
      },
    });
    // console.log("iii", vendorProfile)
    res.status(200).json({ status: "success", data: "ok" });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
});

// vendor acount delete
router.delete("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProfile = await prisma.profile.delete({
      where: {
        vendorId: id,
      },
    });
    const deleteVendor = await prisma.vendor.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "user deleted ", data: deleteVendor });
  } catch (error) {
    res.send({ status: "failed ", data: "something went wrong" });
  }
});

// services
router.post("/services/", async (req, res) => {
  const dda = {
    title: req.body.title,
    price: req.body.price,
    profileId: req.body.profileId,
    dayService: req.body.dayService
    }
  try { 
    const service = await prisma.services.create({
    data: dda
  })
    res.status(200).json({data: service})
  } catch (error) {
    res.send({ status: "failed ", data: error })
  }
})

router.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  const idd = parseInt(id);
  try { 
    const service = await prisma.services.findUnique({
       where: { id: idd }
  })
    res.status(200).json({ data: service })
  } catch (error) {
    res.send({ status: "failed ", data: error })
  }
})


// Secret Route
router.get("/secret", isAuth, (req, res) => {
  res.send({ status: "ok", msg: "it's a secret" });
});

module.exports = router;
