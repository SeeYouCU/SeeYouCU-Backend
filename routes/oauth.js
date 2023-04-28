import express from "express";
import passport from "passport";
import { db } from "../services/db.js";

const router = express.Router();

// Google OAuth2 login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/oauth/failure",
//   })
// );

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/protected",
    failureRedirect: "/oauth/failure",
  }),
  (req, res) => {
    // Get user info from google
    const userInfo = req.user._json;
    const name = userInfo.name;
    const email = userInfo.email;

    // Check if user already exists in the database
    const q = "SELECT * FROM account WHERE email = ?";
    console.log("checking database");
    db.query(q, [email], (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else if (data.length === 0) {
        // User doesn't exist, insert into the database
        console.log("New Account:", name, email);
        const q = "INSERT INTO account (email) VALUES (?)";
        db.query(q, [email], (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json(err);
          } else {
            //Account not in db go to register
            res.redirect("/api/auth/registerGoogle");
          }
        });
      } else {
        // Account exists, redirect to dashboard page
        res.redirect("/protected");
      }
    });
  }
);

router.get("/failure", (req, res) => {
  res.send("something went wrong");
});

router.get("/dummy", (req, res) => {
  res.send("dummy inserted");
  const q = "INSERT INTO newUser (`email`, `name`) VALUE (?)";
  db.query(q, ["flow@gmail.com", "Flow"], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("user has been created.");
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.send("Goodbye");
  });
});

export default router;
