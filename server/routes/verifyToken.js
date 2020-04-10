import User from '../models/User';

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(401).send('access denied');

  try {
    const user = await User.findOne({ token });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('invalid token');
  }
};

export default verifyToken;
