import express from "express";
import {
  joinEvent,
  getJoinedEvent,
  approveJoin,
  getJoinState,
  getJoinedEventInfo,
} from "../controllers/join.js";

const router = express.Router();

router.post("/joinEvent", joinEvent);
router.post("/approveJoin", approveJoin);
router.post("/approveJoin", approveJoin);
router.get("/getJoinedEvent", getJoinedEvent);
router.get("/getJoinstate", getJoinState);
router.get("/getJoinedEventInfo", getJoinedEventInfo);

export default router;
