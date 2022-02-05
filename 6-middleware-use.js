const express = require('express')
const app = express()
const logger = require('./logger')
const auth = require('./authorize')
// between
// req => middleware => res

// without an path this approach enable me to no having to pass the logger() middleware for every route, instead i'm estabilishing that the middleware is a static function/resource
app.use([logger, auth])
// with a path, all routes inside of it will still use those resources like: '/api'; '/api/products; '/api/products/product1'; '/api/items', etc
// to use multiple middleware, just put them inside an array

app.get('/', (req, res)=>{
    res.send('Home')
});

app.get('/about', (req, res)=>{
    res.send('About')
});
app.get('/api/products', (req, res)=>{
    console.log(req.user) // because we created a req.user in the middleware logger, now we can use it
    res.json({greet: "Hello, API"})
})

app.listen(5000, ()=>{
    console.log("Bip Bip Bip.... 5000")
})