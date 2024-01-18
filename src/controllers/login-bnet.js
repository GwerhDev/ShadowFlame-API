const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loginBnet } = require("../integrations/bnet");
const userSchema = require("../models/User");
const { clientUrl } = require("../config");
const { createToken } = require("../integrations/jwt");

passport.use('login-bnet', loginBnet);

router.get('/', passport.authenticate('login-bnet'));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/callback', async (req, res) => {
  try {
    console.log(req.query)
    const { code, state } = req.query;
/*     const user = {
      email: "asd"
    };

    const userExist = await userSchema.findOne({ email: user.email });

    if (userExist) {
      const { _id, role } = userExist;
      const data_login = { id: _id, role };
      const token = await createToken(data_login, 3);

      return res.status(200).redirect(`${clientUrl}/#/auth?token=${token}`);
    } else {
      return res.status(400).redirect(`${clientUrl}/#/auth?token=not_found`);
    } */
    return res.status(200).redirect(`${clientUrl}`);
  } catch (error) {
    console.error(error);
    return res.status(500).redirect(`${clientUrl}/#/auth?token=error`);
  }
});

module.exports = router;