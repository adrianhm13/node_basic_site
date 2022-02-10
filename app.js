const express = require('express')
const path = require('path')

//Init server with express
const app = express()

//Set directory to contain the templates
app.set('public', path.join(__dirname, 'public'))

//Basic Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/homepage.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/about.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/contact.html'))
})

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '/public/404.html'))
})

//Listening to server
app.listen(3000, () => {
    console.log('Server created')
})