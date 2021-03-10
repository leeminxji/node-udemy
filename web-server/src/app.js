// Starting Point
// Web Server : Never gonna stop until we stop . . .
const path = require('path') // built-in, no need to install
const express = require('express') // express is actually a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { equal } = require('assert')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine nad views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // View
hbs.registerPartials(partialsPath) // Partial

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // root, static directory

app.get('', (req, res) => {
    res.render('index', { // index.hbs
        title: 'Weather',
        name: 'leeminxji'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', { // about.hbs
        title: 'About Me',
        name: 'leeminxji'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', { // help.hbs
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'leeminxji'
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { // Callback Chaining
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => { // *: wild card character
    res.render('404', {
        title: '404',
        name: 'leeminxji',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => { // all other stuff. This must be located in the LAST.
    res.render('404', {
        title: '404',
        name: 'leeminxji',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => { // 3000 = Common developing port
    console.log('Server is up on port 3000!')
})