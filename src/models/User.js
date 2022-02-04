require('dotenv').config()
const { response, request } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    email: {
        type: String,
        required: [true, 'email required']
    }
})
userSchema.statics.createUserAndToken = async function (username, password, email) {
    try {
        const emailExist = await this.findOne({ email: email })
        if (!emailExist) {
            const usernameExist = await this.findOne({ username: username })
            if (!usernameExist) {
                const encrypted_password = await bcrypt.hash(password, 10)
                const user = await this.create({ email: email, password: encrypted_password, username: username })
                const token = await this.generateToken(user)
                return { user, token }
            } else {
                return { message: 'Error: username already registered' }

            }
        } else {
            return { message: 'Error: email already registered' }
        }
    } catch (error) {
        return { error }
    }
}
userSchema.statics.generateToken = async function (user) {
    const token = await jwt.sign({ id: user['_id'] }, process.env.SECRET, { expiresIn: '100m' })
    return token
}
userSchema.statics.login = async function (email, password) {
    try {
        const userExist = await this.findOne({ email: email })
        if (userExist) {
            const verifiedPassword = await bcrypt.compare(password, userExist['password'])
            if (!verifiedPassword) return { message: 'No auth provided' }
            const token = jwt.sign({ id: userExist['_id'] }, process.env.SECRET, { expiresIn: '100m' })
            return { auth: true, token }
        } else {
            return { message: 'user not found' }
        }
    } catch (error) {
        return { error }
    }
}
userSchema.statics.getUsers = async function () {
    try {
        const users = await this.find()
        return users
    } catch (error) {
        return { error }
    }
}
module.exports = model('User2', userSchema)