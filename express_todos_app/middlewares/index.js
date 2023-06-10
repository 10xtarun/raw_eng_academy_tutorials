function logger(req, res, next){
        console.log("New Request: ", new Date().toLocaleString(), ", Method: ", req.method, ", URL: " + req.url)
        next()
}

module.exports = {
    logger
}