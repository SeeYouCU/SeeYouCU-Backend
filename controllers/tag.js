import { db } from "../services/db.js";
import jwt from "jsonwebtoken";
import moment from "moment";


exports.getTag= (req, res, next) => {
    console.log("startgetTag");
    const token = req.cookies.accessToken;
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (!req.body.id) {
        return next(new AppError("No user id found", 404));
        }
        conn.query("SELECT tags FROM user WHERE id = ?", [req.body.id], function (err, data, fields) {
        if(err) return next(new AppError(err, 500))
        res.status(200).json({
            data: data,
        });
        });
        });
  }

exports.addTag = (req, res, next) => {
    const token = req.cookies.accessToken;
    jwt.verify(token, "secretkey", (err, userInfo) => {
        conn.query("SELECT tags FROM user WHERE id = ?", [req.body.id], function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
    
        if (data.length === 0) {
            return next(new AppError("User not found", 404));
        }
    
        const userTags = data[0].tags;
    
        if (userTags.includes(req.body.tag)) {
            return res.status(200).json({
            status: "success",
            message: "Tag already exists for the user.",
            });
        }
    
        userTags.push(req.body.tag);
        const updatedTags = JSON.stringify(userTags);
    
        conn.query("UPDATE user SET tags = ? WHERE id = ?", [updatedTags, req.body.id], function (err, result) {
            if (err) return next(new AppError(err, 500));
    
            res.status(200).json({
            status: "success",
            message: "Tag added successfully",
            });
        });
        });
    });
  };
  