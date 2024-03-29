import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

//need to be put in .env
const GOOGLE_CLIENT_ID =
  "175282312397-s2jkpdm3rd5qqaieh03q5aq4cgl9phol.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

export default function oauth(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/oauth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          return done(null, profile);
        });
      }
    )
  );
}
