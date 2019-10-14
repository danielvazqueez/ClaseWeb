const credentials = require('./credentials.js')

const request = require('request')

const mapBox = function(city, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${credentials.MAPBOX_TOKEN}`
  
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
  const url = `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${latitud},${longitud}?lang=es&units=si`

  request({url , json: true}, (error, response) => {
    if (error) {
      callback(error, undefined)
    } else {
      const data = response.body;
      if (data.code) {
        callback(data.error, undefined)
      } else {
        const pronostico = `${data.hourly.summary} Actualmente esta a ${data.currently.temperature}°C, con una sensación térmica de ${data.currently.apparentTemperature}°C. Hay ${data.currently.precipProbability}% de posibilidad de lluvia.`
        const pronostico2 = `Actualmente esta ${data.currently.summary.toLowerCase()} y para los siguientes dias se espera ${data.daily.summary}`
        callback(undefined, pronostico)
        callback(undefined, pronostico2)
      }
    }
  })
}

mapBox('Monterrey', (error, data) => {
  if (error) {
    console.log('Error: ', error)
  } else {
    console.log(data)
  }
})