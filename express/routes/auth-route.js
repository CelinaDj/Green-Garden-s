const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth-controller");

router.post("/api/login", login);

module.exports = router;
