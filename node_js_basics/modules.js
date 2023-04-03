const fsPromises = require("./promise.js")

fsPromises.readFileP("./sample.txt", "utf8")
.then(function(data) {
    console.log("---data---" + data)
})
.catch(function(error) {
    console.log("---error---", error)
})

console.log("---write--- ", fsPromises.writeFileP)