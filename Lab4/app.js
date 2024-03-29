const credentials = require('./credentials.js')

const request = require('request')

const mapBox = function(city) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${credentials.MAPBOX_TOKEN}`
  
  request({url, json: true}, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      const data = response.body
      const longitud = data.features[0].center[0]
      const latitud = data.features[0].center[1]
      if (longitud) {
        forecast(longitud, latitud)
      }
    }
  })
}

const forecast = function(longitud, latitud) {
  const url = `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${latitud},${longitud}?lang=es&units=si`

  request({url , json: true}, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      const data = response.body;
      const pronostico = `${data.hourly.summary} Actualmente esta a ${data.currently.temperature}°C, con una sensación térmica de ${data.currently.apparentTemperature}°C. Hay ${data.currently.precipProbability}% de posibilidad de lluvia.`
      const pronostico2 = `Actualmente esta ${data.currently.summary.toLowerCase()} y para los siguientes dias se espera ${data.daily.summary}`
      console.log(pronostico)
      console.log(pronostico2)
    }
  })
}

mapBox('Monterrey')