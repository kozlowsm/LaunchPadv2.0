const app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);
const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express Server running -> PORT: ${server.address().port}`);
});
