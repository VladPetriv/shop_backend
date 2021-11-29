import jwt from 'jsonwebtoken';

const checkUserRole = (role) => {
  return function (req, res, next) {
    if (req.method == 'OPTION') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'User is not logined' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'No accsess' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      console.error({ err });
      res.status(401).json({ message: 'User is not logined' });
    }
  };
};

export default checkUserRole;
