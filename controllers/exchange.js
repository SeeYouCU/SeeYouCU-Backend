import { db } from "../services/db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const exchangeItem = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO Exchange (`itemID`, `userID`, `accountID`, `dateExchange`) VALUE (?)";
    const values = [
      req.body.itemID,
      req.body.userID,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("item has been exchange.");
    });
  });
};

export const approveItem = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE Exchange SET state = '1' WHERE itemID = ? AND accountID = ?";
    db.query(q, [req.body.itemID, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("item has been approve.");
    });
  });
};

export const getItemState = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT i.state FROM Exchange AS i WHERE i.itemID = ? AND i.accountID = ?`;
    db.query(q, [req.body.itemID, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};


export const getExchangeItems = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT i.*, u.id AS userId, name, profilePic FROM Exchange AS i LEFT JOIN user AS u ON (i.userId = u.id) 
    WHERE i.accountID = ? OR i.userid = ? ORDER BY i.dateExchange DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getItemState = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT i.state FROM Exchange AS i WHERE i.itemID = ? AND i.accountID = ?`;
    db.query(q, [req.body.itemID, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
