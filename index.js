// To automatically load .env file into our applications
require('dotenv').config() //Loads .env file contents into process.env by default

//2.  Import express 
const express = require('express');

// 6.  Import cors
const cors = require('cors')

// Import db connection
require('./DB/connection')

// import router
const router = require('./Routes/router')

//3.  Create server application
const server = express()

// 5.  define port
const PORT = 5000

// 7.  Use server
server.use(cors())
server.use(express.json())
server.use(router)

//4.  Run Application
server.listen(PORT,()=>{
    console.log('Server Listening on port'+PORT);
})

// route - localhost:5000
server.get('/',(req,res)=>{
    res.status(200).json("E Cart Server Is Started")
})

  