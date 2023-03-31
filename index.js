import express from "express";
const app = express();
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import exchangeRoute from "./routes/exchange.js";
import joinEvent from "./routes/join.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/exchange", exchangeRoute);
app.use("/api/join", joinEvent);

app.listen(4000, () => {
  console.log("API working!");
});
