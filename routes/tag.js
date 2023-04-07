import express from "express";
import {} from "../controllers/user.js";
import { getTag,addTag } from "../controllers/tag.js";

const router = express.Router();

router.get("/getTag", getTag);
router.post("/addTag", addTag);

export default router;


