const bnet = require("bnet");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loginBnet, getAccessToken } = require("../integrations/bnet");
const userSchema = require("../models/User");
const { clientUrl, bnetClient, bnetSecret } = require("../config");
const { createToken } = require("../integrations/jwt");

passport.use('login-bnet', loginBnet);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/', passport.authenticate('login-bnet'));

router.get('/callback', async (req, res) => {
  try {
    const user = {
      email: "asd"
    };

    const { code } = req.query || null;
    
    const accessToken = await getAccessToken(code);

    console.log(accessToken);

    const userExist = await userSchema.findOne({email: user.email});
    
    if (userExist) {
      const { _id, role } = userExist;
      const data_login = { id: _id, role };
      const token = await createToken(data_login, 3);

      return res.status(200).redirect(`${clientUrl}/#/auth?token=${token}`);
    } else {
      return res.status(400).redirect(`${clientUrl}/#/auth?token=not_found`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).redirect(`${clientUrl}/#/auth?token=error`);
  }
});

module.exports = router;