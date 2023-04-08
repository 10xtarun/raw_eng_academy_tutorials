const express = require("express")
const utils = require("../utils/utils")
const fs = require("fs/promises")
const { body, validationResult, query, param } = require("express-validator")

const todoRouter = express.Router()

todoRouter.get("/", (req, res) => {
    return utils.readData()
        .then((data) => {
            return res.status(200).json({
                message: "All todos fetched.",
                data,
                error: null
            })
        })
})

todoRouter.post(
    "/",
    body("title").isString(),
    body("description").isString(),
    body("completed").isBoolean(),
    (req, res) => {
        const newTodo = req.body

        return Promise.resolve()
            .then(() => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    throw errors.array()
                }

                return utils.readData()
            })
            .then((data) => {
                data.push(newTodo)
                return fs.writeFile("db.json", JSON.stringify(data))
            })
            .then(() => {
                return res.status(201)
                    .json({
                        message: "Todo created successfully.",
                        data: newTodo,
                        error: null
                    })
            })
            .catch((error) => {
                return res.status(422)
                    .json({
                        message: "Todo creation failed.",
                        data: {},
                        error: error
                    })
            })
    })

const validate = (validations) => {
    return (req, res, next) => {
        return Promise.all(validations.map(validation => validation.run(req)))
            .then(() => {
                const errors = validationResult(req)
                if (errors.isEmpty()) {
                    return next();
                }
                return res.status(400).json({ errors: errors.array() });
            })
    }
}

todoRouter.get(
    "/:title",
    validate([ param("title").isString() ]),
    (req, res) => {
    const title = req.params.title.toLowerCase()

    return utils.readData()
        .then((dataArr) => {
            const todoObj = dataArr.find((todo) => {
                return todo.title === title
            })

            return res.status(200)
                .json({
                    message: "Todo fetched successfully.",
                    data: todoObj,
                    error: null
                })
        })
})

todoRouter.put(
    "/:title",
    validate([ 
        param("title").isString(),
        body("title").isString(),
        body("description").isString(),
        body("completed").custom(flag => flag === true || flag === false).withMessage("Should be a boolean value")
    ]),
    (req, res) => {
    const title = req.params.title.toLowerCase()
    const updateTodo = req.body

    return utils.readData()
        .then((dataArr) => {
            const idx = dataArr.findIndex((todo) => {
                return todo.title === title
            })

            if (idx != -1) {
                dataArr[idx] = {
                    ...dataArr[idx],
                    ...updateTodo
                }
            }

            return fs.writeFile("db.json", JSON.stringify(dataArr))
        })
        .then(() => {
            return res.status(200)
                .json({
                    message: "Todo updated successfully.",
                    data: updateTodo,
                    error: null
                })
        })
})

todoRouter.delete("/:title", (req, res) => {
    const title = req.params.title.toLowerCase()
    let deletedObj

    return utils.readData()
        .then((dataArr) => {
            const idx = dataArr.findIndex((todo) => {
                return todo.title === title
            })

            if (idx != -1) {
                deletedObj = dataArr.splice(idx, 1)
            }
            return fs.writeFile("db.json", JSON.stringify(dataArr))
        })
        .then(() => {
            return res.status(200)
                .json({
                    message: "Todo deleted successfully.",
                    data: deletedObj,
                    error: null
                })
        })
})

module.exports = todoRouter