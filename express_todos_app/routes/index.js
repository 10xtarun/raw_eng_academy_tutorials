const express = require("express")

const router = express.Router()

router.get("", (req, res) => {
    return res.render("index")
})

router.get("/todos", (req, res) => {
    return res.render("todos")
})

module.exports = router