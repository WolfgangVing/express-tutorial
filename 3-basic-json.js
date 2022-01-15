// Some basic knowledge of express and json 'workaround'.
// Here I merely saw how SSR and API with Node.js works.
// While I can somewhat see how Server Side Rendering works
// and how API works, for the first I can deliver files(html, css, js, etc), while
// the second I deliver data(json) which can be used for multiple apps, websites, etc.
const express = require('express')
const {products} = require('./data')
const app = express();


app.get('/', (req, res)=>{
    res.status(200).json(products)
    //res.send('<h1> Home Page </h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res)=>{
    //res.status(200).json(products)
})

app.listen(5000, ()=>{
    console.log("Server is beeping at port 5000")
})