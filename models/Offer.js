const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    offerCode :{
        type : String,
        maxLength : [8, "Maximum charecter reached"],
        required : [true, "Offer Code required"]
    },
    offerTitle : {
        type : String,
        maxLength : [60, "Maximum charecter reached"],
        required : [true, "Offer Title required"],
        unique : true,
    },
    offerDescription : {
        type : String,
        maxLength : [140, "Manimum charecter reached"],
        required : [true, "Offer Description required"],
    },


    offerType : {
        type : String,
        enum : {
            values : ['Percentage_Discount', 'Flat_Discount', 'Free_Gift'],
            message : '{VALUE} is not supported'
        },
        defaultValue : 'Percentage_Discount'
    },


    discount : {
        type : Number,
        min : [0, "Number nust be greater than 0"],
        default : 0
    },


    applicableOn : {
        type : String,
        enum : {
            values : ['All_Order', 'Order_above_amount', 'Select_service'],
            message : '{VALUE} is not supported'
        },
        defaultValue : 'All_Order'
    },


    minOrderValue : {
        type : Number,
        min : [0, "Number nust be greater than 0"],
        default : 0
    },
    // If Percentage Discount is selected in OfferType
    maxDiscount : {
        type : Number,
        min : [0, "Number nust be greater than 0"],
        default : 0
    },



    startData : {
        type : Date,
        default : new Date()
    },
    expirationDate : {
        type : Date,
        default : new Date(new Date().getFullYear() + 100, new Date().getMonth(), new Date().getDate())
    },


    noOfCustomer : {
        type : String,
        enum  : {
            values : ["Limited", "Unlimited"],
        },
        default : "Unlimited"
    },
    // Appear if Limited customer 
    totalCustomer : {
        type : Number,
        min : [0, "Number nust be greater than 0"],
        default : 0
    },


    offerUsePerCustomer : {
        type : String,
        enum  : {
            values : ["Limited", "Unlimited"],
        },
        default : "Unlimited"
    },
    usagePerCustomer : {
        type : Number ,
        min : [0, "Number nust be greater than 0"],
        default : 0
    }
})

// To make the title as slug
offerSchema.pre('save', function(next){
    this.offerTitle = this.offerTitle.split(" ").join("-")
    next()
})






module.exports = mongoose.model('Offer', offerSchema)