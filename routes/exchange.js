import express from "express";
import {
  exchangeItem,
  getExchangeItems,
  approveItem,
  getItemState,
  getExchangeItemsInfo,
} from "../controllers/exchange.js";

const router = express.Router();

router.post("/exchange", exchangeItem);
router.post("/approveItem", approveItem);
router.post("/approveItem", approveItem);
router.get("/getExchangeItem", getExchangeItems);
router.get("/getItemState", getItemState);
router.get("/getExchangeItemsInfo", getExchangeItemsInfo);

export default router;
