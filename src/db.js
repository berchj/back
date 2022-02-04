require('dotenv').config()
const mongoose = require('mongoose')
const connectDatabase = async () => {
    const uri = process.env.DATABASE_URI
    try {
        await mongoose.connect(uri, {}, (err) => {
            if(err) throw err
            console.info({message:'Connected to database'})
         })
    } catch (error) {
        console.error({ error })
    }
}
module.exports = {
    connectDatabase
}