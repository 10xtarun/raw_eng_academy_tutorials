const express = require("express")
const utils = require("../utils/utils")

const router = express.Router()

router.get("", (req, res) => {
    return utils.readData()
        .then((dataArr) => {
            return res.render("index", { title: "Home", todos: dataArr })
        })
})

router.get("/todos/:title", (req, res) => {
    const title = req.params.title.toLowerCase()

    return utils.readData()
        .then((dataArr) => {
            const todo = dataArr.find((element) => (element.title.toLowerCase() === title))

            return res.render("todo", { title: "Update", todo })
        })
})

module.exports = router