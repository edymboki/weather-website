const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/2f6966a471c9de45efc47d7c581c8983/'+ latitude + ',' + longitude +'?units=si'

  request({ url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to the weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location!')
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: `It is currently ${body.currently.temperature} degrees out.`,
        precipitation: `There is a ${body.currently.precipProbability}% chance of rain.`,
        tempHighs: body.daily.data[0].temperatureHigh,
        tempLows: body.daily.data[0].temperatureLow
      })
    }
  })
}

module.exports = forecast