require('dotenv').config()
const axios = require('axios').default
const { Schema, model } = require('mongoose')
const searchSchema = new Schema({
    city: {
        type: String,
        required: [true, 'please enter a city']
    }
})
//searches methods
searchSchema.statics.searchCity = async function (city) {
    try {
        const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.MAPBOX_KEY}&limit=5`
        const array_response = await axios.get(uri, {}).then(response => response['data']['features'])
        const response = array_response.map((e) => {
            return {
                name: e['place_name'],
                lat: e['center'][1],
                lng: e['center'][0]
            }            
        })
        return response
    } catch (error) {
        return { error }
    }
}
searchSchema.statics.searchCityWeather = async function (lat, lng) {
    try {
        const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWHEATHER_KEY}&units=metric`
        const response = await axios.get(uri, {}).then(response => response['data'])
        const { temp, feels_like, temp_min, temp_max, humidity } = response['main']
        return {
            temp,
            feels_like,
            temp_min,
            temp_max,
            humidity
        }
    } catch (error) {
        return { error }
    }
}
module.exports = model('Search', searchSchema)