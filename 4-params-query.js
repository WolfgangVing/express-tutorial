/**
 * When requering data with an API we aren't always using all the collection 
 * of data so in an real-world case there a situations which one use just some
 * data, because of this, we can making a API which will provide those limited data
 * although one can request everything if so permited.
 */

 const express = require('express')
 const app = express();
 const {products} = require('./data');
 
 app.get('/', (req, res)=>{
     res.status(200).send('<h1> Home Page </h1><a href="/api/products">Products</a>')
 })
 
 app.get('/api/products', (req, res)=>{
     const newProducts = products.map((products)=>{
         const {id, name, image} = products
         return {id, name, image}
     })
     res.status(200).json(newProducts)
 })
 
 //This is a overkill, since we wouldn't be able to making a app.get to every single id
 // app.get('/api/products/1', (req, res)=>{
 //     const singleProduct = products.find((products)=> products.id === 1)
 //     res.json(singleProduct)
 // })
 
 //Because of that, we use express Route Parameters
 app.get('/api/products/:productID', (req, res)=> {
     const {productID} = req.params
     const singleProduct = products.find((product)=> product.id === Number(productID))
     //in case singleProduct doesn't exist
     if(!singleProduct) {
         return res.status(404).send("This product doesn't exist.")
     }
     return res.status(200).json(singleProduct)
 })
 
 app.get('/api/v1/query', (req, res)=>{
     console.log(req.query);
     const {search, limit} = req.query
     let sortedProducts = [...products]
 
     if(search) {
         sortedProducts = sortedProducts.filter((product)=>{
             return product.name.startsWith(search)
         })
     }
     if(limit){
         sortedProducts = sortedProducts.slice(0, Number(limit))
     }
     if(Number(limit) === 0) {
         return res.status(200).send("If you want nothing, why asking for nothing ?")
     }
     if(sortedProducts.length < 1){
         return res.status(200).json({sucess:true, data:[]})
     }
     return res.status(200).json(sortedProducts)
     //res.send("Hello World")
 })
 
 app.listen(5000, ()=>{
     console.log("Server listening on port 5000")
 })