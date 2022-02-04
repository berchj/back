const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/user.controller')
const routerSearches = require('./controllers/search.controller')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/api',router)
app.use('/api',routerSearches)
module.exports = app