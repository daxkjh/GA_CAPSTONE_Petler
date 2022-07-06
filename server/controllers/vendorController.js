const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("checking")
})

router.post("/", (req, res) => {
    res.send("post check!!!")
})

router.put("/:id", (req, res) => {
    res.send("update check")
})

router.delete("/:id", (req, res) => {
    res.send("Yo! delete!")
})


module.exports = router;