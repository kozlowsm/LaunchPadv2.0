// Built in Modules
const path = require('path');

// Third party modules
const express = require('express');
const exphbs = require('express-handlebars');
const helmet = require('helmet');

// Initialize our express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// Templating engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engines', 'handlebars');

// Routes

// Start Listening for connections
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
