const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config df
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views') //--> Change from 'views' folder(default name of 'handlebars') to templates(folder that we create)
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs') // handlebars set up
app.set('views', viewsPath)//--> Change from 'views' folder(default name of 'handlebars') to templates(folder that we create)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'TippleS'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'TippleS'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Songsak Satitisungworn'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a Address term'
        })
    } 
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'TippleS',
        errorMessage: 'Help Article not found'

    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'TippleS',
        errorMessage: 'Page not found'

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port+ '.')
})

//nodemon .\src\app.js -e js,hbs --> the command that let the nodemon to monitor file that has extend js ans hbs