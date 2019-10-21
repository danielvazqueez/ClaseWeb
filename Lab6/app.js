
const request = require('request')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'production') {
  var mapbox_token = process.env.MAPBOX_APIKEY
  var darksky_token = process.env.DARKSKY_APIKEY
} else {
  const credentials = require('./credentials.js')
  var mapbox_token = credentials.MAPBOX_TOKEN
  var darksky_token = credentials.DARK_SKY_SECRET_KEY
}

app.get('/', function(req, res) {
  res.send({
    saludo: 'Bienvenido a nuestra aplicación del clima!'
  })
})

app.get('/weather', function(req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Debes enviar el nombre de una ciudad'
    })
  }
  mapBox(req.query.search, (error, data) => {
    if (error) {
      return res.send({
        error: error
      })
    } else {
      console.log("Informacion: " + data)
      res.send({
        informacion: data
      })
    }
  })
})

app.get('*', function(req, res) {
  res.send({
    error: 'Ruta no valida, la unica ruta valida es /weather'
  })
})

app.listen(port, function() { 
  console.log('Up and running!')
})

const mapBox = function(city, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapbox_token}`
  
  request({url, json: true}, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      const data = response.body
      if (response.statusCode != 200) {
        callback(data.message, undefined)
      } else {
        if (!data.features.length) {
          callback('No hay lugares relacionados', undefined)
        } else {
          const longitud = data.features[0].center[0]
          const latitud = data.features[0].center[1]
          forecast(longitud, latitud, callback) 
        }
      }
    }
  })
}

const forecast = function(longitud, latitud, callback) {
  const url = `https://api.darksky.net/forecast/${darksky_token}/${latitud},${longitud}?lang=es&units=si`

  request({url , json: true}, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      const data = response.body;
      if (data.code) {
        callback(data.error, undefined)
      } else {
        const pronostico = `${data.hourly.summary} Actualmente esta a ${data.currently.temperature}°C, con una sensación térmica de ${data.currently.apparentTemperature}°C. Hay ${data.currently.precipProbability*100}% de posibilidad de lluvia.`
        const pronostico2 = `Actualmente esta ${data.currently.summary.toLowerCase()} y para los siguientes dias se espera ${data.daily.summary}`
        callback(undefined, `${pronostico} ${pronostico2}`)
      }
    }
  })
}