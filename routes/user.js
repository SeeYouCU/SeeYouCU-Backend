import express from "express";
import { getUsers, getUser, getMatchedUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/getUser", getUser);
router.post("/getMatchedUsers", getMatchedUsers);

export default router;
