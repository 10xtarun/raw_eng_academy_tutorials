const fs = require("fs")

function readFileP (pathName) {
    // outer outer block
    const promise = new Promise(function(resolve, reject) {
        // outer block
        fs.readFile(pathName, function(error, data) {
            // inner block
            if(error) {
                reject(error)
            }

            resolve(data)
        })
    })

    return promise
}

const writeFileP = fs.writeFile

module.exports = {
    readFileP,
    writeFileP
}
