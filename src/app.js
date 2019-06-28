const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Maina Mboki'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Me:',
    name: 'Maina Mboki'
  })
})

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'How may we help?',
    message: 'Go ask your mom Trebek!',
    name: 'Edgar Mboki'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }
  const address = req.query.address;
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
  
      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      })
    })
  })

  // console.log(req.query)
  // res.send({
  //   address: req.query.address,
  //   forecast: 'Gorilla weather'
  // })
})

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term.'
//     })
//   }
//   console.log(req.query)
//   res.send({
//     products: []
//   })
// })

app.get('/help/*', (req, res) => {
  res.render('404.hbs', {
    title: 'Help article not found',
    message: 'Perhaps we may interest you in other engaging articles in the help link above',
    name: 'Maina Mboki'
  })
})

app.get('*', (req, res) => {
  res.render('404.hbs', {
    title: 'Page not found',
    message: 'The page you are looking for could not be found. Leave us some feedback for content that you would want to see.',
    name: 'Maina Mboki'
  })
})

app.listen(3000, () => {
  console.log('Server is up and running on port 3000')
})