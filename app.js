// Built in Modules
const path = require('path');
const fs = require('fs');

// Third party modules
const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const responseTime = require('response-time');
const morgan = require('morgan');

// Custom Modules
const { eachBetween, jsonItUp } = require('./utilities/hbsHelpers');

// Bring in routes
const index = require('./routes/index');
const launches = require('./routes/launches');
const countries = require('./routes/countries');
const launchProviders = require('./routes/launchProvider');

// Initialize our express application
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Adds a response time header
app.use(responseTime());

// Setup simple logging of routes using Morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'acccess.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Templating engine setup
app.engine('handlebars', exphbs({ helpers: { eachBetween, jsonItUp }, defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.use('/', index);
app.use('/launches', launches);
app.use('/countries', countries);
app.use('/launch-providers', launchProviders);

module.exports = app;
