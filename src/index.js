require('dotenv').config()
const app = require('./app')
const { connectDatabase } = require('./db')
const init = async () => {
    try {
        //init server
        await app.listen(process.env.PORT, () => { console.info(`server running on port ${process.env.PORT}`) })
        //connect database
        await connectDatabase()
    } catch (error) {
        console.error({ error, message_error: error.message })
    }
}
init()
