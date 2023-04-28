import express from "express";
import {
  login,
  loginGoogle,
  register,
  registerGoogle,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.post("/register", register);
router.post("/registerGoogle", registerGoogle);
router.post("/logout", logout);

export default router;
