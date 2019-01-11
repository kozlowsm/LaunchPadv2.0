// Built in Modules
const path = require('path');
const fs = require('fs');

// Third party modules
const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const responseTime = require('response-time');
const morgan = require('morgan');

<<<<<<< HEAD
// Custom Modules
const { eachBetween } = require('./utilities/hbsHelpers');

=======
>>>>>>> a208fd295ad0cbbf9b87033f94b558c86da17c55
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
<<<<<<< HEAD
app.engine('handlebars', exphbs({ helpers: { eachBetween }, defaultLayout: 'main' }));
=======
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
>>>>>>> a208fd295ad0cbbf9b87033f94b558c86da17c55
app.set('view engine', 'handlebars');

// Routes
app.use('/', index);
app.use('/launches', launches);
app.use('/countries', countries);
app.use('/launch-providers', launchProviders);

module.exports = app;
