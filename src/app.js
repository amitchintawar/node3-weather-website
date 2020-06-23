
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
console.log(viewsDirectoryPath)
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handle bars
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amit Chintawar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a sample help message',
        title: 'Help',
        name: 'Amit Chintawar'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not found',
        errorMessage: 'Help article not found',
        name: 'Amit Chintawar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
             error: 'You must provide an address'
         }) 
     }

     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({error}) 
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send ({error}) 
                }
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
                
            })
        }
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send ({
            error: 'You must provide a search term'
        }) 
    }
    console.log(req.query.search)
    res.send( {
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not found',
        errorMessage: 'Page Not Found',
        name: 'Amit Chintawar'
    })
})

app.listen(3000, () => {
    console.log('Server up and running')
})