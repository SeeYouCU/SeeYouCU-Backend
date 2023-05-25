// export const getUser = (req, res) => {
//   //TODO
// };

// const conn = require("../services/db");
// const AppError = require("../utils/appError");
// const errorHandler = require("../utils/errorHandler");
import { db } from "../services/db.js";

export const getUsers = (req, res) => {
  db.query("SELECT * FROM User", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};

export const getUser = (req, res) => {
  const q = "SELECT * FROM User WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (data.length) return res.status(200).json(data);
    if (err) return res.status(500).json(err);
    return res.status(409).json("user doesnt exist");
  });
};

// export const getTags = (req, res) => {
//   const q = "SELECT tags FROM User WHERE email = ?";
//   db.query(q, [req.body.email], (err, data) => {
//     if (data.length) return res.status(200).json(data);
//     if (err) return res.status(500).json(err);
//     return res.status(409).json("user doesnt exist");
//   });
// };

export const getMatchedUsers = (req, res, next) => {
  let userId = req.body.userId;

  db.query(`SELECT * FROM User WHERE id = ${userId}`, function (err, data, fields) {
    if (err) return next(new Error(err));

    if (!data[0]) {
      return res.status(404).json({ message: 'User not found' });
    }

    let user = data[0];
    let userInterests = user.tags ? JSON.parse('[' + user.tags.replace(/'/g, '"') + ']') : [];
    db.query("SELECT * FROM User", function (err, data, fields) {
      if (err) return next(new Error(err));

      let users = data.filter(dbUser => dbUser.id !== user.id);

      let matchedUsers = users
        .map(dbUser => {
          let dbUserInterests = dbUser.tags ? JSON.parse('[' + dbUser.tags.replace(/'/g, '"') + ']') : [];

          return {
            id: dbUser.id,
            count: dbUserInterests.filter(interest => userInterests.includes(interest)).length
          }
        })
        //.filter(dbUser => dbUser.count > 0)
        .sort((a, b) => b.count - a.count)
        .map(dbUser => dbUser.id);

      res.json(matchedUsers);
    });
  });
};

// export const createUser= (req, res, next) => {
//   db.query(
//     "INSERT INTO user (name, password, email, tags) VALUES (?, ?, ?, ?)",
//     [req.query.name, req.query.password, req.query.email, req.query.tags],
//     function (err, data, fields) {
//       if (err) return next(new AppError(err, 500));
//       res.status(201).json({
//         status: "success",
//         message: "user created!",
//       });
//     }
//   );
// }

// exports.getTag= (req, res, next) => {
//   if (!req.params.id) {
//     return next(new AppError("No user id found", 404));
//   }
//   conn.query("SELECT tags FROM user WHERE id = ?", [req.params.id], function (err, data, fields) {
//     if(err) return next(new AppError(err, 500))
//     res.status(200).json({
//       data: data,
//     });
//   });
// }

// exports.createUser= (req, res, next) => {
//   conn.query(
//     "INSERT INTO user (name, password, email, tags) VALUES (?, ?, ?, ?)",
//     [req.query.name, req.query.password, req.query.email, req.query.tags],
//     function (err, data, fields) {
//       if (err) return next(new AppError(err, 500));
//       res.status(201).json({
//         status: "success",
//         message: "user created!",
//       });
//     }
//   );
// }
