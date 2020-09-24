const connectToDB = require('./mongoose');
require('dotenv').config({ path: '.env' });
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3000;

module.exports = (app, routes) => {
  // helmet setup
  app.use(helmet());

  // Rate limit setup
  app.use(
    new RateLimit({
      windowMs: 60 * 1000,
      max: 60,
      delayMs: 0,
    })
  );
  // body parser setup
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // cors setup
  app.use(cors());

  // morgan logging setup
  app.use(morgan('dev'));

  // routes setup
  app.use(`/api/v${process.env.API_VERSION}`, routes);

  // Connect to DB
  connectToDB(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log('app is running on', process.env.PORT || PORT);
    });
  });
};
