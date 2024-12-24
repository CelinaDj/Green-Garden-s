const secretKey = require("../config");
const Fleur = require("../models/fleur");
const jwt = require("jsonwebtoken");
// Get all flowers
const getAllFleurs = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    let isAuthenticated = false;
    if (token) {
      try {
        // Verify the token
        jwt.verify(token, secretKey);
        isAuthenticated = true;
      } catch (err) {
        console.log("Invalid token", err);
        isAuthenticated = false;
      }
    }

    const fleurs = await Fleur.findAll({
      attributes: isAuthenticated
        ? ["id", "name", "price", "description", "image"]
        : ["id", "name", "description", "image"],
    });
    res.status(200).json(fleurs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flowers", error });
  }
};

module.exports = {
  getAllFleurs,
};
