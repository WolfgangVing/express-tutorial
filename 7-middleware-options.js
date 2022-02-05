const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = require('./logger')
const auth = require('./authorize')
// between
// req => middleware => res

//app.use([logger, auth])
//app.use(express.static('./public'))
app.use(morgan('tiny')) //third party middleware

app.get('/', (req, res)=>{
    res.send('Home')
});

app.get('/about', (req, res)=>{
    res.send('About')
});
app.get('/api/products', (req, res)=>{
    console.log(req.user)
    res.json({greet: "Hello, API"})
})

app.listen(5000, ()=>{
    console.log("Bip Bip Bip.... 5000")
})