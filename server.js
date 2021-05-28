// Dependencies
const express = require('express')
const axios = require('axios')
const { join } = require("path")

// Config
const app = express()
const PORT = 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(express.static(join(__dirname, "public")));

// Routes
// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
    res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/", (req, res) => {
    console.log("hellooooo")
    res.render("index.html")
});

app.get('/auth0', (req, res) => {
    console.log("I hit the route from the frontend!!")
    const appNames = []
    axios.get('https://current-conditions.us.auth0.com/api/v2/clients')
        .then((res) => {
            res.json(res.data)
        })
})

// Listener
app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})