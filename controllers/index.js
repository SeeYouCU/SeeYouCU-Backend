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

exports.getTag= (req, res, next) => {
  console.log("startgetTag");
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  conn.query("SELECT tags FROM user WHERE id = ?", [req.params.id], function (err, data, fields) {
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

exports.addTag = (req, res, next) => {
  // ... no changes in the first part of the function

  conn.query("SELECT tags FROM user WHERE id = ?", [req.params.id], function (err, data, fields) {
    if (err) return next(new AppError(err, 500));

    if (data.length === 0) {
      return next(new AppError("User not found", 404));
    }

    const userTags = data[0].tags;

    if (userTags.includes(req.query.tag)) {
      return res.status(200).json({
        status: "success",
        message: "Tag already exists for the user.",
      });
    }

    userTags.push(req.query.tag);
    const updatedTags = JSON.stringify(userTags);

    conn.query("UPDATE user SET tags = ? WHERE id = ?", [updatedTags, req.params.id], function (err, result) {
      if (err) return next(new AppError(err, 500));

      res.status(200).json({
        status: "success",
        message: "Tag added successfully",
      });
    });
  });
};



