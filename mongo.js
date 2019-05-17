const mongoose = require('mongoose')

// Huom. Palomuuriongelman takia en saanut MongoDB Atlasta toimimaan,
// joten käytetty paikallisesti asennettua MongoDB:tä

// const salasana = process.argv[2]

const osoite = 'mongodb://127.0.0.1:27017/testiosa3'
mongoose.connect(osoite, { useNewUrlParser: true })

const yhteystietoSkeema = new mongoose.Schema({
    nimi: String,
    numero: String
})

const Person = mongoose.model('Person', yhteystietoSkeema)

if (process.argv.length === 5) {
    const person = new Person({
        nimi: process.argv[3],
        numero: process.argv[4]
    })
    
    person.save().then(response => {
        console.log('saved!');
        mongoose.connection.close();
    })
}

if (process.argv.length<3) {
    console.log('salasana puuttuu!')
    process.exit(1)
}

if (process.argv.length<5) {
    Person.find({}).then(result => {
        console.log('Puhelinluettelo: ')
        result.forEach(person => {
          console.log(person.nimi, person.numero)
        })
        mongoose.connection.close()
      })
}







