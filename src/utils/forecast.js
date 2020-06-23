const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f8affc5d408d7d9cdbb99466be8cc109&query=${latitude},${longitude}&units=f`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Error connecting to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
            console.log()
        } else {
            const forecast = `${body.current.weather_descriptions[0]}!It is currently ${body.current.temperature} out. It feels like ${body.current.feelslike} out`
            callback(undefined, forecast)
        }
    })
}
module.exports = forecast
