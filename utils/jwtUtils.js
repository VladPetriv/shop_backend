const jwt = require('jsonwebtoken');

const generateToken = (id, login) => {
  const token = jwt.sign({ id, login }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
  return token;
};

module.exports = {
  generateToken,
};
