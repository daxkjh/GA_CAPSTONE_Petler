const router = require("express").Router();
const prisma = require("../server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const userAuth = require("../middleware/userAuth")
const vendorAuth = require("../middleware/vendorAuth")
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dax-ga-sei36', 
    api_key: '887198321937621', 
    api_secret: 'utEOWgDrspFvhTwAcOavkTBZY2g' 
})


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
    res.status(200).json({msg:"Created", data: users });
  } catch (error) {
    res.status(400).json({msg:" User Not Created",data: error});
  }
});

// ## READ All User Profile
router.get("/profile/", async (req, res) => {
  try {
    const userProfiles = await prisma.userProfile.findMany({});
    res.json({ data: userProfiles});
  } catch (error) {
    res.json({
      status: "failed",
      message: "Unable to fetch user profile data",
    });
  }
});

//READ User Profile - Profile Page on Load (SHOW route)
router.get("/profile/:id",userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.userProfile.findUnique({ 
      where: { userId : id },
      include:{
            pets : true,
            booking: true,
            reviews : true
      
        },
      });
      // console.log("Show User Route Triggered!", user)
      res.status(200).json({ status: "success", data: user });
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

router.put("/editprofile/:id",userAuth, async (req,res)=>{
  const {id} = req.params
  try {
    const user = await prisma.userProfile.update({
      where :{ userId: id },
      data: {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        image: req.body.image,
      }
    })
    res.status(200).json({status:"Success", msg:"Profile Updated!"})
  } catch (error) {
    res.status(400).json({status:"Failed", msg:"Updated Failed!", error: error})
  }
  
})

// USER PROFILE PIC UPLOAD
router.post("/upload/:id",userAuth, async (req,res)=>{
  const id = parseInt(req.params.id);
  
 try {
   
   const {data} = req.body
 
   // console.log("IMAGE",image)
   const imageurl = await cloudinary.uploader.upload( data, {folder: "user"} )
   
   const imageUpload = await prisma.userProfile.update({where : {id : id}, 
     data : { image : imageurl.secure_url
   }})
   res.status(200).json({msg:"success", data: imageUpload})
 } catch (error) {
   res.status(400).json({ status: "failed", data: error });
 }

})



// ### UPDATE User Password
router.put("/:id",userAuth, async (req,res)=>{
  const {id} = req.params
  const newPassword = await bcrypt.hash(req.body.password,saltRounds)
  try {
   const vendor = await prisma.user.update({
     where:{ id: id },
    data:{ password: newPassword}})
   res.status(200).json({message:"Password Updated"})
  } catch (error) {
   res.status(400).json({status:"error", message : error})
  }
 })


// ### USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(404).json({ message: "No User Found" });
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);
      console.log(match)
      if (!match) {
        res.status(404).json({ message: "Password Incorrect" });
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
    res.status(400).json({status: "error"});
  }
});

// ### UPDATE User WIP
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   num = parseInt(id);
//   const data = req.body;
//   console.log(num);
//   async function main() {
//     const updateUser = await prisma.user.update({
//       where: {
//         id: num,
//       },
//       data,
//     });
//     console.log(vendor);
//   }
//   main()
//     .catch((e) => {
//       throw e;
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// });

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
    res.json({ data:deleteUser });
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
