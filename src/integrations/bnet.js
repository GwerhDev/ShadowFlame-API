const { apiUrl, bnetClient, bnetSecret } = require('../config');
const axios = require('axios');
const BnetStrategy = require('passport-bnet').Strategy;

const loginBnet = new BnetStrategy({
  clientID: bnetClient,
  clientSecret: bnetSecret,
  callbackURL: `${apiUrl}/login/callback`,
  state: 200,
  response_type: "code",
  region: "us",
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
});


const getAccessToken = async (code) => {
  const response = await axios.post(
    'https://oauth.battle.net/',
    `grant_type=authorization_code&code=${code}&client_id=${bnetClient}&client_secret=${bnetSecret}&redirect_uri=${apiUrl}/login/callback/`
  );

  return response;
}


module.exports = {
  loginBnet,
  getAccessToken
}