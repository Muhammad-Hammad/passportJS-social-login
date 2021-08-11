"use strict";

const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res, next) => {
  const { user } = req;
  if (user) console.log(user);
  res.render("home", { user });
});

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/return",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res, next) => {
    console.log("req", req);
    res.redirect("/");
  }
);
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/login/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { scope: "email", failureRedirect: "/" }),
  (req, res, next) => {
    res.redirect("/");
  }
);

module.exports = router;
