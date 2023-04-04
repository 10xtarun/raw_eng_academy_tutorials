const express = require("express")
const fs = require("fs/promises")
const utils = require("./utils/utils")
const todoRouter = require("./routes/todos.routes")
const viewRouter = require("./routes/index")

// initialize the express app
const app = express()

// view engine config
app.use("/assets", express.static("./assets"))
app.set("view engine", "ejs")

// middlewares
/* add body parser middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// hello world API call for our server/app
app.get("/greetings", (req, res) => {
    return res.send("Greetings from Todo App.")
})

// routers
// View Routes
app.use("/", viewRouter)

// REST APIs
app.use("/todos", todoRouter)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})