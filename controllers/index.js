const conn = require("../services/db");
const AppError = require("../utils/appError");
const errorHandler = require("../utils/errorHandler");

exports.getUsers = (req, res, next) => {
  conn.query("SELECT * FROM user", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      data: data,
    });
  });
}

exports.getUser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  conn.query("SELECT * FROM user WHERE id = ?", [req.params.id], function (err, data, fields) {
    if(err) return next(new AppError(err, 500))
    res.status(200).json({
      data: data,
    });
  });
}

exports.createUser= (req, res, next) => {
  conn.query(
    "INSERT INTO user (name, password, email, tags) VALUES (?, ?, ?, ?)",
    [req.query.name, req.query.password, req.query.email, req.query.tags],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "user created!",
      });
    }
  );
}
