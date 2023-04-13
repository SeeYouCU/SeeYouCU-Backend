import { db } from "../services/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //Check if exist
  const q = "SELECT * FROM newUser WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist");
    //create new user
    //hash a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // const hashedPassword = req.body.password;

    const q =
      "INSERT INTO newUser (`username`, `email`, `password`, `name`) VALUE (?)";
    const value = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [value], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user has been created.");
    });
  });
};
export const login = (req, res) => {
  const q = "SELECT * FROM newUser WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong Password or Username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      seure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
