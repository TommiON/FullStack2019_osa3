const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
var uniqueValidator = require('mongoose-unique-validator')

// mongodb://127.0.0.1:27017/testiosa3

console.log('yhdistetään: ', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('yhteys MongoDB:hen muodostettu')
  })
  .catch((error) => {
    console.log('virhe, ei yhdistetty MongoDB:hen:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {type: String, minlength: 3},
    number: {type: String, minlength: 8}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)