import express from "express";
import { joinEvent, getJoinedEvent } from "../controllers/join.js";

const router = express.Router();

router.post("/joinEvent", joinEvent);
router.get("/getJoinedEvent", getJoinedEvent);

export default router;
