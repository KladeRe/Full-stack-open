const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config();
const Phone = require("./models/phone")

var morgan = require("morgan")

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token("body", request => {
    return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :body"))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Phone.find({}).then(phones => {
        response.json(phones.map(phone => phone.toJSON()))

    })
    
})

app.get("/api/persons/:id", (request, response) => {
    Phone.findById(request.params.id).then(phone => {
        if (phone) {
            response.json(phone.toJSON())
        } else {
            response.status(404).end()
        }

    })
    
})

app.delete("/api/persons/:id", (request, response) => {
    Phone.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end()

    })

})

app.post("/api/persons", (request, response) => {
    const phone = request.body
    const name = phone.name
    const number = phone.number

    if (name.length == 0 || number == null) {
        response.status(404).send({error: "name must be unique"})
    } else {
        const newPhone = new Phone({
            name: name,
            number: number,
        })

        newPhone.save().then(savedPhone => savedPhone.toJSON()).then(savedPhoneJSON => {
            response.json(savedPhoneJSON)
        })

    }

})

app.get('/info', (request, response) => {
    let currentDate = new Date()

    Phone.find({}).then(phones => {
        response.send(`<div><p>Phonebook has info for ${phones.length} people</p><p>${currentDate}</p></div>`)
        
    })

    
})

app.put("/api/persons/:id", (request, response) => {
    const phone = request.body

    const updatedPerson = {
        name: phone.name,
        number: phone.number,
    }

    Phone.findByIdAndUpdate(request.params.id, updatedPerson, {new: true}).then(newPerson => {
        response.json(newPerson.toJSON())
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})