require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')

// Huom: Tiny-konfiguraatiota ei voinut käyttää, Morgan valitti että se on
// "deprecated" ja jäädytti koko sovelluksen.

const morgan = require('morgan')
morgan.token('requestBody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :status :url :response-time :requestBody'))

/*
let persons = [
    {
        id: 1,
        name: 'Tommi',
        number: '123'
    },
    {
        id: 2,
        name: 'Hanna',
        number: '999'
    },
    {
        id: 3,
        name: 'Kake',
        number: '666'
    },
    {
        id: 4,
        name: 'Naksu',
        number: '1000'
    }
]
*/

app.get('/api/persons', (req, res, next) => {
    Person.find({})
    .then(persons => {
        res.json(persons)
    })
    .catch(error => next(error))
    // res.json(persons)
})

app.get('/info', (req, res) => {
    const lukumaara = Person.count({})
    const paivays = Date()
    res.send(`Puhelinluettelossa on ${lukumaara} henkilöä, nyt on ${paivays}`)
    // res.send(`Puhelinluettelossa on ${persons.length} henkilöä ${Date()}`)   
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
    .then(person => res.json(person))
    .catch(error => next(error))

    /*
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    */
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            console.log('löytyi ja tuhottiin')
            res.status(204).end()
        })
        .catch(error => next(error))
    
    /*
    person = persons.find(person => person.id === id)
    if (!person) {
        console.log('ei löydy tuhotavaa')
        res.status(404).end()
        return
    }
    persons = persons.filter(person => person.id !== id)
    console.log('löytyi ja tuhottiin')
    res.status(204).end()
    */
})

app.post('/api/persons', (req, res, next) => {
    const person = req.body

    if(person.name === "" || person.number === "") {
        return res.status(400).json({ 
            error: 'nimi tai numero puuttuu' 
          })
    }

    /*
    const onJo = persons.find(p => p.name === person.name)
    if(onJo) {
        return res.status(400).json({ 
            error: 'nimi löytyy jo luettelosta' 
          })
    }
    */
    
    console.log('nimi: ', person.name, ' numero: ', person.number)
    const savedPerson = new Person({
        name: person.name,
        number: person.number
    })
    
    savedPerson.save()
    .then(response => {
        console.log('Uusi henkilö tallennettu kantaan.')
        // persons = persons.concat(person)
        res.json(savedPerson)
    })
    .catch(error => next(error))

    /*
    person.id = getRandomInt(persons.length+1, 1000000)
    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    persons = persons.concat(person)
    res.json(person)
    */
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => {
        res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'virheellisesti muotoiltu id' })
      }
    if (error.name === 'ValidationError') {
        console.log(error)
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`palvelin käynnissä osoitteessa ${PORT} `)
})