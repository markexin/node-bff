const express = require('express')
const moniter = require('./helpers/middleware-wrapper');
const app = express();
const { cpus } = require('os');

console.log(cpus().length);

// moniter middleware
app.use(moniter());

app.listen(8001);