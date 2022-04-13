require("dotenv").config();

const server = {
  port: process.env.PORT || 3000,
};

const firebase = {
  apikey: process.env.Apikey,
  authdomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRESIN,
};

module.exports = {
  server,
  firebase,
  jwt,
};
