import express from "express";
import {
    joinEvent,
    getJoinedEvent,
    approveJoin,
    getJoinState,
  } from "../controllers/join.js";

const router = express.Router();


router.post("/joinEvent", joinEvent);
router.post("/approveJoin", approveJoin);
router.get("/getJoinedEvent", getJoinedEvent);
router.get("/getJoinstate", getJoinState);
export default router;
