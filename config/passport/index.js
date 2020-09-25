const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = function (passport) {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    'jwt-admin',
    new Strategy(opts, async function (jwt_payload, done) {
      try {
        console.log('==================================');
        console.log(jwt_payload);
        console.log('==================================');
      } catch (error) {
        return done({
          message: 'This user is not registered or not authorized',
        });
      }
    })
  );

  //   passport.use(
  //     'jwt-user',
  //     new Strategy(opts, async function (jwt_payload, done) {
  //       try {
  //         let user = await User.findById(jwt_payload._id).populate([
  //           { path: 'deliveryAddresses.country', select: 'name' },
  //           { path: 'deliveryAddresses.city', select: 'name' },
  //           { path: 'deliveryAddresses.area', select: 'name location' },
  //         ]);

  //         if (!user)
  //           return done({
  //             en: 'This User is not registered',
  //             errorType: ErrorType.UNAUTHORIZED,
  //           });

  //         if (user.role !== UserRole.USER)
  //           return done({
  //             en: 'This User is not authorized',
  //             errorType: ErrorType.UNAUTHORIZED,
  //           });

  //         if (
  //           !user.isEmailVerified &&
  //           !user.isMobileVerified &&
  //           !user.isFacebookAuthorized
  //         )
  //           return done({
  //             en:
  //               'This User is not verified. Please verify either your email or mobile used to sign up in order to continue. Alternatively sign in easily via Facebook.',
  //             errorType: ErrorType.UNAUTHORIZED,
  //           });

  //         return done(null, user);
  //       } catch (error) {
  //         report.error({ error });

  //         return done({
  //           en: 'This user is not registered or not authorized',
  //           error,
  //           errorType: ErrorType.UNAUTHORIZED,
  //         });
  //       }
  //     })
  //   );
};
