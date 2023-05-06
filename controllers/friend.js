import { db } from "../services/db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const makeFriendWith = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT IGNORE INTO IsFriendWith (`followerUserId`, `followedUserId`, `date`) VALUE (?)";
    const values = [
      userInfo.id,
      req.body.followedUserId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user make new friend!");
    });
  });
};

export const unFriendWith = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM IsFriendWith WHERE id = ?";
    const values = [req.body.id];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user are unfriend!");
    });
  });
};

export const isFriendWith = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT i.id AS RelationshipId, u.id AS userId, followedUserId AS friendWith, date FROM IsFriendWith AS i LEFT JOIN User AS u ON (i.followerUserId = u.id) 
    WHERE i.followerUserId = ? ORDER BY i.date DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
