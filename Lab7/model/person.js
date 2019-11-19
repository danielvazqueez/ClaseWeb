const validator = require('validator')
const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
  name: String,
  age: {
    type: Number,
    required: true
  },
  hobbies: [String],
  sex: String,
  birthday: Date,
  parents: [String],
  profession: String,
  mobilePhone: {
    type: String,
    unique: true,
    validate(value) {
      if( !validator.isMobilePhone(value) || value.length != 10 ) {
        throw new Error('Teléfono móvil invalido')
      }
    }
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
