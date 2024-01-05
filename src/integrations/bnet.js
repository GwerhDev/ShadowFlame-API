const { apiUrl, bnetClient, bnetSecret } = require('../config');
const BnetStrategy = require('passport-bnet').Strategy;

const loginBnet = new BnetStrategy({
  clientID: bnetClient,
  clientSecret: bnetSecret,
  callbackURL: `${apiUrl}/login/callback`,
  state: 200,
  region: "us",
  scope: "openid"
}, function (accessToken, refreshToken, profile, done) {
  console.log("asdasd")
  return done(null, profile);
});

module.exports = {
  loginBnet,
}