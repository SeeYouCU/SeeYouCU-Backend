import { db } from "../conect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const joinEvent = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO joins (`Eid`, `userID`, `accountID`, `dateJoin`) VALUE (?)";
    const values = [
      req.body.Eid,
      req.body.userID,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Event has been join.");
    });
  });
};

export const getJoinedEvent = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT i.*, u.id AS userId, name, profilePic FROM joins AS i LEFT JOIN user AS u ON (i.userId = u.id) 
      WHERE i.accountID = ? OR i.userid = ? ORDER BY i.dateJoin DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
