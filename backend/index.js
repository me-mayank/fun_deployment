const express = require('express')
require('dotenv').config()
const app = express()
const fetch = require('node-fetch')
const port = process.env.PORT || 5050

app.get('/', (req, res) => {
    res.send("The server is operational")
})

app.get('/home', (req, res) => {
    res.send('<h1>Welcome to the homepage</h1>')
})

// codeforces data-scrapping from API's of CF
app.get('/cf/:username', async(req, res) => {
     const username = req.params.username;
     const url = `https://codeforces.com/api/user.info?handles=${username}`;

     try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.status == "OK"){
            const user = data.result[0];
            res.json({
                //rawData: data.result[0], // just testing out how raw data from api looks like 
                ppf: user.avatar,
                handle: user.handle, 
                rating: user.rating,
                maxRating: user.maxRating,
                rank: user.rank,
                maxRank: user.maxRank,
                city: user.city,
                college: user.organization
            });
        } 
        else {
            res.status(404).json({error: "User not found"});
        }
     }
     catch (error){
        res.status(500).json({
            error: "Failed to fetch to Codeforces",
            reason: error.message
        });
     }
});

app.listen(port,() => {
    console.log(`The server is listening on port ${port}`)
});