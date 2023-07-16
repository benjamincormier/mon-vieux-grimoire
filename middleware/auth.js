const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('req.headers.authorization :', req.headers.authorization);
    console.log('decodeToken :', decodedToken);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
