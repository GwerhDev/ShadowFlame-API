const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loginBnet } = require("../integrations/bnet");

passport.use('login-bnet', loginBnet);

router.get('/', passport.authenticate('bnet'));

router.get('/callback', passport.authenticate('login-google', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failure'
}));

router.get('/success', async (req, res) => {
  try {
    const profile = req.session.passport.profile;
    console.log(profile)
    const userExist = await userSchema.findOne({email: profile.email});
    
    if (userExist) {
      const { _id, role } = userExist;
      const data_login = { id: _id, role };
      const token = await createToken(data_login, 3);

      return res.status(200).redirect(`${clientUrl}/#/auth?token=${token}`);
    } else {
      return res.status(400).redirect(`${clientUrl}/#/auth?token=none`);
    }
  } catch (error) {
    return res.status(400).redirect(`${clientUrl}/#/auth?token=none`);
  }
});

module.exports = router;