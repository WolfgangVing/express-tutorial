const express = require('express');
const path = require('path')

const app = express();

console.log(path.resolve(__dirname, './public/index.html'))

// setup static content and middleware
app.use(express.static('./public'))

// app.get('/', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, './public/index.html'))
//     adding to static assets
//     SSR
// })

app.all('*', (req, res)=>{
    res.status(404).send('Humans does not go there')
})

app.listen(5000, ()=>{
    console.log("Let's party, baby!")
})