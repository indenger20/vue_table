const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const UserServices = require('../src/services/UserService');
const config = require('./config');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.app.secretkey
};

const strategy = new JwtStrategy(opts, (payload, next) => {
    const user = {
        id: 1,
        username: 'yaroslav',
        email: 'yaroslav@gmail.com'
    };
    UserServices.getUser()
    //   User.forge({ id: payload.id }).fetch().then(res => {
    //     next(null, res);
    //   });
    //   UserServices
});

passport.use(strategy);

module.exports = passport;