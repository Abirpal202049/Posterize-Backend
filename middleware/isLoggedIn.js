const jwt = require('jsonwebtoken');

exports.isLoggedin = async (req, res, next) => {
    try {
        console.log(req.cookies)
        // Getting the token from the cookies 
        const token = req.cookies.token
        console.log(token);

        // Checking if the token exist or not
        if (!token) {
            return res.json({ 
                success: false, 
                message: "Please Login to access" 
            })
        }

        // Decoding the token
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        console.log("Decoded JWT Data: ", decode);


        // Putting it in the req.userDetails
        req.userDetail = decode

        // Moving to the next function
        next()

    } catch (error) {
        return res.json({
            success: false,
            message: "Some Error occured",
            errorMsg: error.message
        })
    }
}