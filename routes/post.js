import express from "express";
import { getEvents, getItems, addEvent, addItem } from "../controllers/post.js";

const router = express.Router();

router.get("/getEvents", getEvents);
router.get("/getItems", getItems);
router.post("/addPost", addEvent);
router.post("/addItem", addItem);

export default router;
