import express from "express";
import {
  exchangeItem,
  getExchangeItems,
  approveItem,
  getItemState,
} from "../controllers/exchange.js";

const router = express.Router();

router.post("/exchange", exchangeItem);
router.post("/approveItem", approveItem);
router.post("/approveItem", approveItem);
router.get("/getExchangeItem", getExchangeItems);
router.get("/getItemState", getItemState);

export default router;
