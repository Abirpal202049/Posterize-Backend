const Offer = require('../models/Offer')

// Getting all the offers
exports.getAllOffer = async (req, res) => {
    try {
        const allOffer = await Offer.find({})

        if(allOffer.length < 0) {
            return res.json({
                success :false,
                message : 'No Offer Exist'
            })
        }

        allOffer.sort((a, b) => {
            return b.startData - a.startData;
        })

        return res.json({
            success :true,
            allOffer :allOffer
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Getting the offer based on the title
exports.getOfferByTitle = async (req, res) => {
    try {
        const title = req.params.title

        const offer = await Offer.findOne({ offerTitle: title})
        if (!offer){
            return res.json({ 
                success  :false,
                message : 'No Offer Exist'
            })
        }

        return res.json({ 
            success :true,
            offer
        })

    } catch (error) {
        return res.json({
            success: false,
            message: "error.message"
        })
    }
}

// Getting the latest offer
exports.getLatestOffer = async (req, res) => {
    try {
        const allOffer = await Offer.find({})

        if(allOffer.length < 0) {
            return res.json({
                success :false,
                message : 'No Offer Exist'
            })
        }

        allOffer.sort((a, b) => {
            return a.startData - b.startData;
        })

        return res.json({ 
            success :true,
            offer : allOffer[allOffer.length - 1]
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}