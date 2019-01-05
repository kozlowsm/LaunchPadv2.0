// Bring in the initialized application
const app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);
const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express Server running -> PORT: ${server.address().port}`);
});

// Close the server gracefully if something bad happens
process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.log('something terribly wrong happened', err);

  server.close(() => process.exit(1));
});
