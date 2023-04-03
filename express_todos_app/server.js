const express = require("express")
const fs = require("fs/promises")
const utils = require("./utils/utils")
const todoRouter = require("./routes/todos.routes")

// initialize the express app
const app = express()

// middlewares
app.use(express.json())

// hello world API call for our server/app
app.get("/greetings", (req, res) => {
    return res.send("Greetings from Todo App.")
})

// routers
app.use("/todos", todoRouter)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})