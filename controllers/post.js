import { db } from "../services/db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getEvents = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT e.*, u.id AS userId, u.firstName AS firstName, u.lastName AS LastName FROM Events AS e JOIN User AS u ON (u.id = e.userid ) 
    ORDER BY e.createAt DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getItems = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT i.*, u.id AS userId, u.firstName AS firstName, u.lastName AS LastName FROM Items AS i JOIN User AS u ON (u.id = i.userid ) 
    ORDER BY i.createAt DESC`;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addEvent = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO Events (`desc`, `img`, `userid`, `Ename`, `MaxP`, `date`, `location`, `meetUp`, `tag`, `createAt`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      req.body.Ename,
      req.body.MaxP,
      req.body.date,
      req.body.location,
      req.body.meetUp,
      req.body.tag,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("event has been created.");
    });
  });
};

export const addItem = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO Items (`desc`, `img`, `userid`, `createAt`, `return`, `PlaceOfPurchase`, `DateOfPurchase`, `Condition`, `tag`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.return,
      req.body.PlaceOfPurchase,
      req.body.DateOfPerchase,
      req.body.condition,
      req.body.tag,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("item has been created.");
    });
  });
};
