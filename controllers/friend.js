import { db } from "../services/db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const makeFriendWith = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT IGNORE INTO IsFriendsWith (`followerUserId`, `followedUserId`, `date`) VALUES (?)";
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

    const q = "DELETE FROM IsFriendsWith WHERE id = ?";
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
    const q = `SELECT i.id AS RelationshipId, u.id AS userId, followedUserId AS friendWith, date FROM IsFriendsWith AS i LEFT JOIN User AS u ON (i.followerUserId = u.id) 
    WHERE i.followerUserId = ? ORDER BY i.date DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

//get all user who this user have not added
export const isNotAdded = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT u.id
    FROM (SELECT * FROM IsFriendsWith WHERE followerUserID = ?) AS i RIGHT JOIN User AS u ON (i.followedUserId = u.id)
    WHERE followerUserID is NULL and u.id != ?;`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

//get all user who added this user
export const userAddedMe = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT followerUserID AS userAddedYou
    FROM IsFriendsWith AS i JOIN User AS u ON (i.followedUserId = u.id) 
    WHERE u.id = ?;`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
