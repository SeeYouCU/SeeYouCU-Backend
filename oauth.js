const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

//need to be put in .env
const GOOGLE_CLIENT_ID =
  "175282312397-s2jkpdm3rd5qqaieh03q5aq4cgl9phol.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
