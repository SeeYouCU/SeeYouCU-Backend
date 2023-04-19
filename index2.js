import express from "express";
import session from "express-session";
import passport from "passport";
// import oauth from "./oauth.js";
// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
import oauth from "./oauth.js";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: "cat" }));
app.use(passport.initialize());
app.use(passport.session());

oauth(passport);

app.get("/", (req, res) => {
  res.send('<a href="/oauth/google"> Authenticate with Google');
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/oauth/failure",
  })
);

app.get("/oauth/failure", (req, res) => {
  res.send("something went wrong");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.send("Goodbye");
  });
});

app.listen(8080, () => {
  console.log("listen on 8080");
});
