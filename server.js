// Dependencies
const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')

// Config
const app = express()
dotenv.config()
const PORT = process.env.PORT
const DOMAIN = process.env.DOMAIN
const ACCESS_TOKEN = process.env.ACCESS_TOKEN


// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.get('/auth0', async (req, res) => {

    // Fetch apps/clients
    const apps = await axios.get(`${DOMAIN}/api/v2/clients`, {
        headers: { authorization: ACCESS_TOKEN}
    }).then((res) => {
            return res.data
    })

    //Fetch rules
    const rules = await axios.get(`${DOMAIN}/api/v2/rules`, {
        headers: { authorization: ACCESS_TOKEN}
    }).then((res) => {
        console.log(res.data)
            return res.data
    })

    // Init output variable
    const output = {}

    // Loop through one app at a time
    for (let i = 0; i < apps.length; i++) {
        // Init key/value pairs for each app
        output[apps[i].name] = {}
        output[apps[i].name].rules = []
        // Loop through each rule and check for app name within the script
        for (let j = 0; j < rules.length; j++) {
            // If found, push that rule into the rules array of that app
            if (rules[j].script.includes(apps[i].name)) {
                output[apps[i].name].rules.push(rules[j].name)
            }
        }
    }

    // Return the output
    res.json(output)
    
})

// Listener
app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})