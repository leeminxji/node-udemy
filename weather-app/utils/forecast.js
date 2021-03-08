const request = require('request')

const forecast = (lat, long, callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=a480ba44ebbb79ecd09930d1d013a7a7&query=' + lat + ',' + long + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) { // Low level error
            callback('Unable to conect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '.' + ' It is currently ' + 
                        body.current.temperature + ' degrees out. It feels like ' +  body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast