const express = require("express");
const checkAuth = require("../middlewares/auth");
const router = express.Router();

const config = require("../config/config");

const { saveCookie } = require("../controllers");

router.get("/", (req, res) => {
  const secrets = {
    apiKey: config.firebase.apikey,
    authDomain: config.firebase.authdomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
  };
  res.render("login", secrets);
});

router.get("/dashboard", checkAuth, (req, res) => {
  res.render("dashboard", { user: req.user, layout: "dashlayout.ejs" });
});

router.get("/savecookie", saveCookie);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
