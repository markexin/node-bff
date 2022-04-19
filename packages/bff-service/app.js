const express = require('express')
const moniter = require('./helpers/middleware-wrapper');
const app = express();

// moniter middleware
app.use(moniter());

app.listen(8001);