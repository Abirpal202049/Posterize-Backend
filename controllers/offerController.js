const Offer = require('../models/Offer')

// Creating offer 
exports.createOffer = async (req, res) => {
    try {
        const {
            offerCode,
            offerTitle,
            offerDescription,
            offerType,
            discount,
            applicableOn,
            minOrderValue,
            maxDiscount,
            startData,
            expirationDate,
            noOfCustomer,
            totalCustomer,
            offerUsePerCustomer,
            usagePerCustomer
        } = req.body

        if (!offerCode || !offerTitle || !offerDescription || !offerType || !applicableOn || !startData) {
            return res.json({
                success: false,
                message: 'All the fields are required'
            })
        }

        const offer = await Offer.create({
            offerCode,
            offerTitle,
            offerDescription,
            offerType,
            discount,
            applicableOn,
            minOrderValue,
            maxDiscount,
            startData,
            expirationDate,
            noOfCustomer,
            totalCustomer,
            offerUsePerCustomer,
            usagePerCustomer
        })

        if (!offer) {
            return res.json({
                success: true,
                message: "Faild to create object"
            })
        }

        return res.json({
            success: true,
            message: "Offer Created Successfully",
            offer
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Updating the offer
exports.updateOffer = async (req, res) => {
    try {
        const id = req.params.id
        console.log("Offer Id : ", id);

        const offer = await Offer.findById(id)
        console.log(!offer)
        if (!offer) {
            return res.json({
                success: false,
                message: "Offer DoesNot exist"
            })
        }

        // Getting the things to be updated from the body
        const offerBody = req.body

        // Runing the validation to check the uniqueness of the OfferTitle
        offerBody.offerTitle = offerBody.offerTitle.split(" ").join("-")

        //! Update Validators Only Run On Updated Paths
        //! Update Validators Only Run For Some Operations ($set $unset $push $addToSet $pull $pullAll)
        const offerUpdate = await Offer.updateOne({ _id: id }, {$set : offerBody}, { runValidators: true }, function (err) {
            return res.json({
                success: false,
                message: "Validation Error Occured",
                errMsg: err.message
            })
        })

        return res.json({
            success: true,
            message: "Offer Updates Successfully",
            offerUpdate,
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Delete the offer
exports.deleteOffer = async (req, res) => {
    try {
        const id = req.params.id
        console.log("Offer Id : ", id);

        const offer = await Offer.findById(id)
        if (!offer) {
            return res.json({
                success: false,
                message: "Offer DoesNot exist"
            })
        }

        const delOffer = await Offer.deleteOne({_id : id})

        return res.json({
            success: true,
            message: "Offer deleted successfully",
            delOffer
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}