// HTTP without a library
const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=a480ba44ebbb79ecd09930d1d013a7a7&query=40,-75&units=f'

const request = http.request( url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', (() => {
        const body = JSON.parse(data)
        console.log(body)
    }))

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()