import express from 'express';
import verifyToken from './verifyToken';

const UserRoute = express.Router();

UserRoute.get('/user', verifyToken, async (req, res) => {
  if (req.user) {
    const { name, photo, status, likes } = req.user;
    res.json({ name, photo, status, likes });
  }
});

export default UserRoute;
