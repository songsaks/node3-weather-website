const request = require('postman-request')

// const forecast = (latitude,longitude, callback) =>{
//     const url = 'http://api.weatherstack.com/current?access_key=435036ee9bc80e2587bffc0b04e7c925&query='+ latitude + ',' + longitude + '&units=m'
//     //console.log(url)
//     // http://api.weatherstack.com/current?access_key=435036ee9bc80e2587bffc0b04e7c925&query=37.8267,-122.4233&units=f

//     request ({url: url, json:true},(error ,response) => {
//         if (error) {
//             callback('Unable to connect to the weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degree out.')
//         }
//     })
// }



const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=435036ee9bc80e2587bffc0b04e7c925&query='+ latitude + ',' + longitude + '&units=m'
    //console.log(url)
    // http://api.weatherstack.com/current?access_key=435036ee9bc80e2587bffc0b04e7c925&query=37.8267,-122.4233&units=f

    request ({url: url, json:true},(error ,{body}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log()
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degree out. The humidity is ' + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast