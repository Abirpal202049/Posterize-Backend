const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser') 
const morgan = require('morgan');



// Default middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(morgan("tiny"));


// Importing the routes
const userRoute = require('./routes/userRoute')
const offerRoute = require('./routes/offerRoure')
const getOfferRoute = require('./routes/offerGetRoutes')

// Routes
app.use('/api/user', userRoute)
app.use('/api/offer', offerRoute)
app.use('/api/offer/get', getOfferRoute)


// Dummy Api
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Backend is working...'
    })
})


module.exports = app