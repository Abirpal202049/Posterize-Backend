const jwt = require('jsonwebtoken')
const Offer = require('../models/Offer')


exports.login = async (req, res) => {
    try {
        // Accepting username and password from the user 
        const { username, password } = req.body


        // Check if username and password is empty or not
        if (!username || !password) {
            return res.json({
                success: false,
                message: "Fields are required"
            })
        }

        // Check if username and password are not same
        if (username !== process.env.ADMINUSERNAME || password !== process.env.PASSWORD) {
            return res.json({
                success: false,
                message: "Credentials don't match",
            })
        }

        // Generate a jwt token
        const token = jwt.sign(
            {
                userName: process.env.ADMINUSERNAME,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1 day'
            }
        )


        // Generate the option to store the token in the cookies
        const options = {
            expires: new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }

        // Storing it in the cookies
        return res.status(200).cookie('token', token, options).json({
            success: true,
            message: "User Logged In Successfully",
            token,
            userName: username
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


// ! No Need of this  route this is a test route to check the protected route test
exports.getAllOffer = async(req, res) => {
    try {
        return res.json({
            success: true,
            message: "Here we we get all the offer data"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}