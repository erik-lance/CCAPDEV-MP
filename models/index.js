const express = require('express')
const app = new express()

var server = app.listen(3000, function () {
    console.log ('Node server is running...')
});