const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()


// Connecting the database
const dbConnect = require('./config/dbConnect')
dbConnect()


// Listing to the port 
const PORT = 3000 | process.env.PORT
app.listen(PORT, ()=>{
    console.log(`The app is running at ${PORT}`);
})