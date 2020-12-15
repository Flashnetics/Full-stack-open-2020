require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URL = process.env.MONGODB_URL

if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = process.env.MONGODB_URL_TEST
}



module.exports = {
    MONGODB_URL,
    PORT
}