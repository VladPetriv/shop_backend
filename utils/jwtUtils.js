import jwt from 'jsonwebtoken';

const generateToken = (id, login, email) => {
  const token = jwt.sign({ id, login, email }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
  return token;
};

export default generateToken;
