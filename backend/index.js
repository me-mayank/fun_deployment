const express = require('express')
require('dotenv').config
const app = express()
const port = process.env.PORT || 5050

app.get('/', (req, res) => {
    res.send("The server is operational")
})

app.get('/home', (req, res) => {
    res.send('<h1>Welcome to the homepage</h1>')
})

app.listen(port,() => {
    console.log(`The server is listening on port ${port}`)
})