const express = require("express");
const router = express.Router();
const prisma = require("../server");
const { bookings } = require("../server");

// booking
router.post("/", async (req, res) =>{
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
      res.send({status: "failed", data: error})
    }
  })

  module.exports = router;