import express from "express";
import {
  makeFriendWith,
  unFriendWith,
  isFriendWith,
} from "../controllers/friend.js";

const router = express.Router();

router.post("/makeFriendWith", makeFriendWith);
router.post("/unFriendWith", unFriendWith);
router.get("/isFriendWith", isFriendWith);

export default router;
