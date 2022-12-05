const express = require ('express')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 50 * 1000, // 10 mins
    max: 50
})

app.use(limiter)
app.set('trust proxy', 1)

app.use('/api/fsq', require('./routes/fqs.js'))
app.use('/api/mapbox', require('./routes/mapbox'))

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))