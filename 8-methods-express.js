const express = require('express')
const app = express()
let {people} = require('./data')

// static assets
app.use(express.static('./methods-publics'))

// parse form data
app.use(express.urlencoded({extended: false}))
//In order to get the data we have to use a middleware to treat the object of http request.
//since we have a built-in middleware in Express we can just parse the data with it, this will make so that
// the server can treat the data for further uses

// parse json
app.use('/api/people', express.json())


app.get('/api/people', (req, res)=>{
    res.status(200).json({success:true, data:people})
})

//from here onwards the changes that would be expected from those http requests isn't going to persist,
// thus making only for practice
app.post('/api/people', (req, res)=>{
    const {name} = req.body
    if(!name) {
        return res.status(400).json({success: false, msg: "please provide a name"})
    }
    res.status(201).json({success: true, person: name})
})

app.post('/api/people/postman', (req, res)=>{
    const {name} = req.body
    if(!name) {
        return res
            .status(400)
            .json({success: false, msg: "please provide a name"})
    }

    res.status(201).json({success: true, data: [...people, name], msg: `${name} succesfuly added`})
})

app.put('/api/people/postman/:id', (req, res)=>{
    const {id} = req.params
    const {name} = req.body
    
    const person = people.find((person)=> person.id === Number(id))
    
    if(!person) {
        return res.status(400).json({success: false, msg: "This person doesn't exist!"})
    } else if (!name) {
        return res.status(400).json({success: false, msg: "Please write a"})
    }
    let oldPerson;
    const newPeople = people.map((person)=>{
        if(person.id === Number(id)){
            oldPerson = person.name
            person.name = name
        }
        return person
    })
    res.status(200).json({
        success: true,
        data: newPeople,
        msg: `Person ${person.id} changed name from ${oldPerson} to ${newPeople.id}`
    })
})

app.delete('/api/people/postman/:id', (req, res)=>{
    const {id} = req.params
    const person = people.find((person)=> person.id === Number(id))
    
    if(!person) {
        return res
            .status(400)
            .json({success: false, msg: `the person with the id:${id} exist`})
    }
    const newPeople = people.filter((person)=> person.id !== Number(id))
    return res.status(200).json({
        success: true, 
        data: newPeople, 
        msg: `Deleted this >${id}< sucker from the data`})
})

app.post('/login', (req, res)=>{
    //console.log(req)
    const {name} = req.body
    if(name) {
        return res.status(200).send(`Welcome, ${name}!`)
    }
    
    res.status(401).send("I don't know you. Provide your credentials, your moron")
})

app.listen(5000, ()=>{
    console.log("Bip Bip Bip.... 5000")
})