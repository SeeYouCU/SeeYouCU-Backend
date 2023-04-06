import express from "express";
import { exchangeItem, getExchangeItems } from "../controllers/exchange.js";

const router = express.Router();

router.post("/exchange", exchangeItem);
router.get("/getExchangeItem", getExchangeItems);

export default router;
