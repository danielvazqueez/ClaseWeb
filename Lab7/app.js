const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes.js')
const port = process.env.PORT || 3000
const app = express()

const connectionURL = 'mongodb+srv://admin:admin@cluster0-vqvsm.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(express.json())
app.use(router)

app.listen(port, function() {
  console.log('Server up and running on port', port)
})