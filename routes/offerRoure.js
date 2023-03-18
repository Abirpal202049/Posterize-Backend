const express = require('express');
const router = express.Router()

// Create a new Offer   (/create/offer)
// Delete the Offer     (/delete/offer/:id)
// Update the offer     (/update/offer/:id)

// Importing the controllers
const { createOffer, updateOffer, deleteOffer } = require('../controllers/offerController');

router.post('/create', createOffer)
router.put('/update/:id', updateOffer)
router.delete('/delete/:id', deleteOffer)


module.exports = router;