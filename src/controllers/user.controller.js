const express = require('express')
const router = express.Router()
const userSchema = require('../models/User')
const { verifyToken } = require('../middlewares/middlewares')
router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const message_login = await userSchema.login(email, password)
    res.json({message_login})
})
router.post('/signup', async (req, res) => {    
    const { email, username, password } = req.body
    const created_user_message = await userSchema.createUserAndToken(username, password, email)
    res.json({ status: res.statusCode, created_user_message })        
})
router.get('/profile', verifyToken, async (req, res) => {     
    const users = await userSchema.getUsers()        
    res.json({users})
})
module.exports = router