import express from 'express';
import passport from 'passport';
import User from '../models/User';

const isDev = process.env.DEV;

const hostApi = isDev
  ? 'http://localhost:3000'
  : 'https://tricks-api.herokuapp.com';

const AuthRoute = express.Router();

AuthRoute.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  })
);

AuthRoute.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  async (req, res) => {
    const { id, displayName, photos } = req.user.profile;
    const user = await User.findOne({ id });

    if (!user) {
      const user = User({
        id,
        name: displayName,
        photo: photos[0].value,
        token: req.user.token,
        status: 'moderator', // DEBUG
        likes: [],
      });

      user.save();
    } else {
      user.token = req.user.token;
      user.save();
    }

    const token = req.user.token;
    res.redirect(`${hostApi}?token=${token}`);
  }
);

export default AuthRoute;
