import jwt from 'jsonwebtoken';

const generateToken = (id, login, email, cartId) => {
  const token = jwt.sign({ id, login, email, cartId }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
  return token;
};

export default generateToken;
