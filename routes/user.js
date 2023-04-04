const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/").get(controllers.getUsers).post(controllers.createUser);
router
 .route("/:id")
 .get(controllers.getUser,);
router
 .route("/tag/:id")
 .get(controllers.getTag);
module.exports = router;
