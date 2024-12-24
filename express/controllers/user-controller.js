const secretKey = require("../config");
const { User, Bouquet, Transaction } = require("../models");
const jwt = require("jsonwebtoken");
const getLikedBouquets = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Bouquet,
        as: "likedBouquets",
        attributes: ["id"],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedBouquets = user.likedBouquets.map((bouquet) => bouquet.id);
    res.json(likedBouquets);
  } catch (error) {
    console.error("Error fetching liked bouquets:", error);
    res.status(500).json({ error: "Failed to fetch liked bouquets" });
  }
};

const createTransaction = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { userId, bouquets } = req.body;

  if (!userId || !Array.isArray(bouquets) || bouquets.length === 0) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const bouquet of bouquets) {
      const bouquetExists = await Bouquet.findByPk(bouquet.id);
      if (!bouquetExists) {
        return res.status(404).json({
          message: `Bouquet with ID ${bouquet.id} not found`,
        });
      }

      await Transaction.create({
        userId,
        date: new Date(),
        price: bouquet.prix,
        bouquetId: bouquet.id,
      });
    }

    return res
      .status(201)
      .json({ message: "Transactions successfully created" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getWishlist = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      // Verify the token
      jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const likedBouquets = await user.getLikedBouquets({
      attributes: ["id", "name", "description", "price", "image"],
    });

    return res.status(200).json(likedBouquets);
  } catch (error) {
    console.error("Erreur lors de la récupération de la wishlist :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
module.exports = { getLikedBouquets, createTransaction, getWishlist };
