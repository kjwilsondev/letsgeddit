// variables
const express = require('express');
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone');
const bcrypt = require("bcryptjs");

// Set db
require('./data/reddit-db');

require('dotenv').config();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//import express from 'express'
const methodOverride = require('method-override');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const port = process.env.PORT || 5000;
// initializing handlebars
const exphbs = require('express-handlebars');

// models
const Post = require('./models/post')

// controllers
const posts = require('./controllers/posts')
const comments = require('./controllers/comments-controller.js');
const auth = require('./controllers/auth.js');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// after body parser initialization!
app.use(expressValidator());
// serve all client-side assets in its public folder
app.use(express.static('public'))
// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
};

app.use(checkAuth);


posts(app)
comments(app)
auth(app)

// host
app.listen(port, () => console.log(`Example app listening on port ${port}!`))