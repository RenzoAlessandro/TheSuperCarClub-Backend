const express = require('express')
const app = express()

app.get('/test', (req, res) => {
    res.send('Hola desde mi servidor NodeJS')
})


module.exports = app;