const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/").get(controllers.getUsers).post(controllers.createUser);
router.route("/:id").get(controllers.getUser);
router.route("/:id/tag").get(controllers.getTag);
router.route("/:id/addTag").get(controllers.addTag);
module.exports = router;
