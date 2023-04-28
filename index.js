import express from "express";
const app = express();
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";
import exchangeRoute from "./routes/exchange.js";
import joinEvent from "./routes/join.js";
import friendRoute from "./routes/friend.js";
import friendRoute from "./routes/friend.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import oauth from "./oauth.js";
import oauthRoutes from "./routes/oauth.js";

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Initialize Passport middleware
app.use(session({ secret: "cat" }));
app.use(passport.initialize());
app.use(passport.session());

// Call the oauth function with the Passport object
oauth(passport);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/exchange", exchangeRoute);
app.use("/api/join", joinEvent);
app.use("/api/oauth", oauthRoutes);
app.use("/api/friend", friendRoute);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send('<a href="/api/oauth/google"> Authenticate with CUSeeyou');
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.email}`);
});

app.listen(8080, () => {
  console.log("API working!");
});
