const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("checking!!!!!")
})

router.post("/", (req, res) => {
    res.send("post check!!!")
})

router.put("/", (req, res) => {
    res.send("update checkkkkkk")
})

router.delete("/:id", (req, res) => {
    res.send("Yo! delte!")
})


module.exports = router;