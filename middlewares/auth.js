const { jwtVerify } = require("../utils/jwt");

// check authenticated user
function checkAuth(req, res, next) {
  if (req.cookies.jwt) {
    const decode = jwtVerify(req.cookies.jwt);
    if (!decode) {
      return res.redirect("/");
    }

    req.user = decode.payload;
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = checkAuth;
