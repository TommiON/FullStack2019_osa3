const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`Puhelinluettelossa on ${persons.length} henkilöä ${Date()}`)   
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    person = persons.find(person => person.id === id)
    if (!person) {
        console.log('ei löydy tuhotavaa')
        res.status(404).end()
        return
    }
    persons = persons.filter(person => person.id !== id)
    console.log('löytyi ja tuhottiin')
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    console.log(person)

    if(person.name === "" || person.number === "") {
        return res.status(400).json({ 
            error: 'nimi tai numero puuttuu' 
          })
    }

    const onJo = persons.find(p => p.name === person.name)
    if(onJo) {
        return res.status(400).json({ 
            error: 'nimi löytyy jo luettelosta' 
          })
    }

    person.id = getRandomInt(persons.length+1, 1000000)
    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`palvelin käynnissä osoitteessa ${PORT} `)
})