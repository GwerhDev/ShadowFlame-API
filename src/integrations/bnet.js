const { apiUrl, bnetClient, bnetSecret } = require('../config');
const BnetStrategy = require('passport-bnet').Strategy;

const loginBnet = new BnetStrategy({
  clientID: bnetClient,
  clientSecret: bnetSecret,
  callbackURL: `${apiUrl}/login/callback`,
  region: "us"
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(async function () {
      try {
        return done(null, profile);
      } catch (err) {
        return done(err);
      }
    });
  }
);

module.exports = {
  loginBnet
}