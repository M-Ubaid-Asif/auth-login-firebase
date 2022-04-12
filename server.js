const express = require("express");
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");
const serviceAccount = require("./serviceAccountKey.json");
const app = express();
const expressLayout = require("express-ejs-layouts");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(expressLayout);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

app.get("/dashboard", checkAuth, (req, res) => {
  console.log("----.decode", req.user);
  res.render("dashboard", { user: req.user });
});

app.get("/savecookie", (req, res) => {
  const token = req.query.idToken;

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(token, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie("session", sessionCookie, options);
        // console.log("======>", sessionCookie);
        admin
          .auth()
          .verifyIdToken(token)
          .then(function (decode) {
            res.redirect("/dashboard");
          });
      },
      (error) => {
        res.status(401).send("UnAuthorised Request");
      }
    );
});

function checkAuth(req, res, next) {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decode) => {
      req.user = decode;
      next();
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid.
      // Force user to login.
      res.redirect("/");
    });
}

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
