const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/middlewares')
const searchSchema = require('../models/Search')
router.post('/city', verifyToken, async (req, res) => {
    const { city } = req.body
    const searched_data = await searchSchema.searchCity(city)
    res.json({ places: searched_data })
})
router.post('/weather', verifyToken, async (req, res) => { 
    const { lat,lng } = req.body
    const message_final_city = await searchSchema.searchCityWeather(lat,lng)
    res.json({message_final_city})
})
module.exports = router