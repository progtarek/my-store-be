const celebrateErrorHandler = require('./celebrate/error-handler');
const connectToDB = require('./mongoose');
require('dotenv').config({ path: '.env' });
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const passportStrategiesSetup = require('./passport');
const PORT = 4000;

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

  // Passport setup
  app.use(passport.initialize({ userProperty: 'user' }));
  passportStrategiesSetup(passport);

  // routes setup
  app.use(`/api/v${process.env.API_VERSION}`, routes);

  // celebrate error handler
  app.use(celebrateErrorHandler);

  // Connect to DB
  connectToDB(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log('App is running on', process.env.PORT || PORT);
    });
  });
};
