const express = require("express");
const router = express.Router();
const fleurController = require("../controllers/fleur-controller");

router.get("/api/fleurs", fleurController.getAllFleurs);

module.exports = router;
