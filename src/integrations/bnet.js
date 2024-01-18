const { apiUrl, bnetClient, bnetSecret } = require('../config');
const BnetStrategy = require('passport-bnet').Strategy;

const loginBnet = new BnetStrategy({
  clientID: bnetClient,
  clientSecret: bnetSecret,
  callbackURL: `${apiUrl}/login-bnet/callback`,
  state: 200,
  region: "us",
  scope: "openid"
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    console.log(profile)
    return done(null, profile);
  });
});

module.exports = {
  loginBnet,
}