import express from "express";
import { makeFriendWith, isFriendWith } from "../controllers/friend.js";

const router = express.Router();

router.post("/makeFriendWith", makeFriendWith);
router.get("/isFriendWith", isFriendWith);

export default router;
