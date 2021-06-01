// Dependencies
const express = require('express')
const axios = require('axios').default
const dotenv = require('dotenv')
const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

// Config
const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080
const DOMAIN = process.env.DOMAIN
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const AUDIENCE = process.env.AUDIENCE

// Middleware
app.use(express.json())
app.use(cors())

// JWT Config
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${DOMAIN}/.well-known/jwks.json`
  }),
  // Set audience to the identifier of the API you created
  audience: `${AUDIENCE}`,
  issuer: `https://${DOMAIN}/`,
  algorithms: ['RS256']
})
app.use(jwtCheck)

// Routes
app.get('/mgmt/rules-per-app', jwtCheck, async (req, res) => {

    // Config request options
    let options = {
        method: `POST`,
        url: `https://${DOMAIN}/oauth/token`,
        headers: {'content-type': 'application/json'},
        data: {
            grant_type: 'client_credentials',
            client_id: `${CLIENT_ID}`,
            client_secret: `${CLIENT_SECRET}`,
            audience: `https://${DOMAIN}/api/v2/`
        }
    }
    //Fetch and format access token
    const ACCESS_TOKEN = await axios.request(options).then((res) => {
        return `Bearer ${res.data.access_token}`
    })

    // Fetch apps/clients
    const apps = await axios.get(`https://${DOMAIN}/api/v2/clients`, {
        headers: { authorization: ACCESS_TOKEN}
    }).then((res) => {
            return res.data
    })

    //Fetch rules
    const rules = await axios.get(`https://${DOMAIN}/api/v2/rules`, {
        headers: { authorization: ACCESS_TOKEN}
    }).then((res) => {
            return res.data
    })

    // Init output variable
    const output = []

    // Loop through one app at a time
    for (let i = 0; i < apps.length; i++) {
        // Init key/value pairs for each app
        output[i] = {}
        output[i].app = apps[i].name
        output[i].rules = []
        // Loop through each rule and check for app name within the script
        for (let j = 0; j < rules.length; j++) {
            // If found, push that rule into the rules array of that app
            if (rules[j].script.includes(apps[i].name)) {
                output[i].rules.push(rules[j].name)
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