const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectory = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../views/partials')

app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Francisco',
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Francisco'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'Help page',
        title: 'Help',
        name: 'Francisco'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    console.log(req.query.address)
    place = req.query.address

    geocode(place,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error,{description}) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: description,
                location,
                address: place
            })
        })
    })
})



app.get('/products',(req,res) => {
        if(!req.query.search){
            return res.send({
                error: 'You must provide a search term'
            })
        }

        console.log(req.query)
        res.send({
            products: []
        })
})

app.get('/help/*',(req,res) => {
    res.render('error404',{
        title:'404 Help',
        name: 'Francisco',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('error404',{
        title:'404',
        name: 'Francisco',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 300.')
});

