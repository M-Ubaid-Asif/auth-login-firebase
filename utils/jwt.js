const jwt = require("jsonwebtoken");
const config = require("../config/config");

const signJwt = (payload) => {
  const token = jwt.sign(payload, config.jwt.secret);
  return token;
};

const jwtVerify = (token) => {
  return jwt.verify(token, config.jwt.secret, { complete: true });
};

module.exports = { signJwt, jwtVerify };
