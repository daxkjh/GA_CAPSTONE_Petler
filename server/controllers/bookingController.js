const express = require("express");
const router = express.Router();
const prisma = require("../server");
const { bookings } = require("../server");
const userAuth = require("../middleware/userAuth")
const vendorAuth = require("../middleware/vendorAuth")


// create booking
router.post("/", userAuth ,async (req, res) =>{
  console.log(req.body)
    try {
      const booking = await prisma.bookings.create({
        data: { profileId: req.body.profileId,
        userProfileId: req.body.userProfileId,
        servicesId: req.body.servicesId,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        status: req.body.status,
        bookingdesc: req.body.bookingdesc,}
      }
      )
      res.status(200).json({ status: "success", data:booking })
    } catch (error) {
      res.status(400).json({ status: "failed", data: error })
    }
  })

// read booking 
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const idd = parseInt(id)
  console.log(idd)
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        profileId: idd
      },
      orderBy: {
        startDateTime: "asc"
      },
      include: {
        profile: true,
        services: true,
        user: true
      }
    })
    console.log("no more bug please", bookings)
    res.status(200).json({ status: "success", data: bookings })
  } catch (error) {
    res.send({ status: "failed", data: error })
  }
})

// read booking user
router.get("/u/:id", async (req, res) => {
  const { id } = req.params;
  const idd = parseInt(id)
  console.log(idd)
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        userProfileId: idd
      },
      orderBy: {
        startDateTime: "asc"
      },
      include: {
        profile: true,
        services: true,
        user: true
      }
    })
    console.log("no more bug please", bookings)
    res.status(200).json({ status: "success", data: bookings })
  } catch (error) {
    res.send({ status: "failed", data: error })
  }
})

// read booking from calendar
router.get("/calendar", async (req, res) => {
  console.log("hi")
  res.send("date")
})


// update booking
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const idd = parseInt(id)
  console.log(idd)
  try {
    const bookings = await prisma.bookings.update({
      where: {
        id: idd
      },
      data: {
        status: req.body.status,
      }
    })
    console.log(req.body.status)
    res.status(200).json({ status: "success", data: bookings })
  } catch (error) {
    res.send({ status: "failed", data: error })
  }
})
  module.exports = router;