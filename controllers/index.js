const admin = require("firebase-admin");
const logger = require("../config/logger");
const { signJwt } = require("../utils/jwt");

exports.saveCookie = (req, res) => {
  logger.info("inside controller/saveCookie");
  const token = req.query.idToken;

  admin
    .auth()
    .verifyIdToken(token)
    .then(async function (decode) {
      const token = await signJwt(decode);
      res.cookie("jwt", token);
      res.redirect("/dashboard");
    })
    .catch((err) => {
      res.status(401).send("UnAuthorised Request");
    });
};
