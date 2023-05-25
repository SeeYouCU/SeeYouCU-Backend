import express from "express";
import {
  makeFriendWith,
  unFriendWith,
  isFriendWith,
  isNotAdded,
  userAddedMe,
} from "../controllers/friend.js";

const router = express.Router();

router.post("/makeFriendWith", makeFriendWith);
router.post("/unFriendWith", unFriendWith);
router.get("/isFriendWith", isFriendWith);
router.get("/isNotAdded", isNotAdded);
router.get("/userAddedMe", userAddedMe);

export default router;
