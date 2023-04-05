const express = require("express")
const utils = require("../utils/utils")

const router = express.Router()

router.get("", (req, res) => {
    return utils.readData()
        .then((data) => {
            return res.render("index", { title: "Home", data })
        })
})

router.get("/todos/add", (req, res) => {
    return res.render("todos_add", { title: "Add" })
})

router.get("/todos/:title", (req, res) => {
    const { title } = req.params

    return utils.readData()
        .then((dataArr) => {
            const data = dataArr.find((element) => element.title.toLowerCase() === title.toLowerCase())
            return res.render("todos", { title: "Update", todo: data })
        })
})

module.exports = router