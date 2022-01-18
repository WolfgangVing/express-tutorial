// !!! THIS IS NOT THE REAL WAY TO AUTHORIZE, JUST A EXAMPLE OF HOW POWERFULL THE USE OF MIDDLEWARE IS!!!
// a real approach would be verifying the web token
const authorize = (req, res, next)=>{
    const {user} = req.query
    if (user === 'john') {
        req.user = {name:'john', id:1}
        next()
    }
    else {
        res.status(401).send("Unauthorized")
    }
    console.log('authorize');
    next()
}

module.exports = authorize