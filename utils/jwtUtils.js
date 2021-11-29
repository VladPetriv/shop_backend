import jwt from 'jsonwebtoken';

const generateToken = (id, login, email, role, cartId) => {
  const token = jwt.sign(
    { id, login, email, role, cartId },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );
  return token;
};

export default generateToken;
