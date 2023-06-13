const express = require("express")
const fs = require("fs/promises")
const utils = require("./utils/utils")
const todoRouter = require("./routes/todos.routes")
const authRouter = require("./routes/auth.routes")
const viewsRouter = require("./routes/views.routes")
const middlewares = require("./middlewares/index")

// initialize the express app
const app = express()

// set view engine
app.set("view engine", "ejs")

// middlewares
app.use(middlewares.logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// hello world API call for our server/app
app.get("/greetings", (req, res) => {
    return res.send("Greetings from Todo App.")
})

// view routers
app.use("/", viewsRouter)

// api routers
app.use("/api/v1/todos", todoRouter)
app.use("/api/v1/auth", authRouter)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})