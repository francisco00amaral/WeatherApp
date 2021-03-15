const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=d46be20d6c8efa3ad8fc4ee07dcf8200&query=' + latitude + ',' + longitude
    console.log(url)
    request({url ,json : true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weatherstack API',undefined)
        }else if(body.error){
            callback('Unable to find location.Try another search',undefined)
        }else{
            callback(undefined,{
                description: body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degrees outside. However it feels like ' + body.current.feelslike + ' degrees.'
            })
        }
    })
}

module.exports = forecast