const logger = (req, res, next) => {
    //using this middleware i can output those content in any of route futher created.
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

module.exports = logger