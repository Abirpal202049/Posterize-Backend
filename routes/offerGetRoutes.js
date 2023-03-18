const express = require('express');
const router = express.Router()

// Get all the offers which we have created -> (/get/offers) -> to display on the dashboard
// Get the offers by their title (/get/offer/:titile) -> a kind of slug 
// Get the current offer based on the offer date and the expiry date (/get/latest)  -> To be called on the `/` route on frontend

// Importing the controllers
const { getAllOffer, getLatestOffer, getOfferByTitle } = require('../controllers/offerGetController');

router.get('/offers', getAllOffer)
router.get('/offer/:title', getOfferByTitle)
router.get('/latest', getLatestOffer)

module.exports = router