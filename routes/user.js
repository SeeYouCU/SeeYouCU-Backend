const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/").get(controllers.getUsers).post(controllers.createUser);
router
 .route("/:id")
 .get(controllers.getUser);

module.exports = router;
