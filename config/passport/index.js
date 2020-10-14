const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../app/DB/models/User');

module.exports = function (passport) {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    'jwt-admin',
    new Strategy(opts, async function (jwt_payload, done) {
      try {
        const user = await User.findOne({
          _id: jwt_payload._id,
          role: 'admin',
        });
        if (!user) return done(new Error('This User is not registered'));

        return done(null, user);
      } catch (error) {
        return done({
          message: 'This user is not registered or not authorized',
        });
      }
    })
  );

  passport.use(
    'jwt-user',
    new Strategy(opts, async function (jwt_payload, done) {
      try {
        const user = await User.findOne({
          _id: jwt_payload._id,
          role: 'user',
        });
        if (!user) return done(new Error('This User is not registered'));

        return done(null, user);
      } catch (error) {
        return done({
          message: 'This user is not registered or not authorized',
        });
      }
    })
  );
};
