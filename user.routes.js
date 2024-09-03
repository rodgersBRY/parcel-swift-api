const router = require("express").Router();
const controller = require("./user.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/:id", controller.getUser);

module.exports = router;
