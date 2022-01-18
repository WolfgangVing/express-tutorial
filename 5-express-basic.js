const express = require('express')
const app = express()

// between
// req => middleware => res

const logger = (req, res, next) => {
    //using this middleware i can output those content in any of route futher created.
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

app.get('/', /*logger,*/ (req, res)=>{
    res.send('Home')
});

app.get('/about', /*logger,*/ (req, res)=>{
    res.send('About')
});

app.listen(5000, ()=>{
    console.log("Bip Bip Bip.... 5000")
})