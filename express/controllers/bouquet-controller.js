const secretKey = require("../config");
const { Bouquet, Fleur, User } = require("../models");
const jwt = require("jsonwebtoken");

async function getBouquetsWithFlowers(req, res) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

    // Check if the token is valid
    let isAuthenticated = false;
    if (token) {
      try {
        // Verify the token
        jwt.verify(token, secretKey);
        isAuthenticated = true; // User is authenticated
      } catch (err) {
        console.log("Invalid token", err);
        isAuthenticated = false; // Invalid or expired token
      }
    }

    // Fetch bouquets with associated flowers and users who liked them
    const bouquets = await Bouquet.findAll({
      include: [
        {
          model: Fleur,
          as: "fleurs",
          attributes: ["id", "name"],
        },
        {
          model: User, // Assuming you have a User model
          as: "likedBy", // You should have this association in your Sequelize models
          attributes: ["fullname"], // Selecting the fullname of the users who liked the bouquet
          through: { attributes: [] }, // If you're using a join table, this removes extra columns from the join table
        },
      ],
      attributes: isAuthenticated
        ? ["id", "name", "price", "likes", "description", "image"]
        : ["id", "name", "description", "image"],
    });

    // Return bouquets with users who liked them
    return res.status(200).json(bouquets);
  } catch (error) {
    console.error("Error fetching bouquets:", error);
    res.status(500).json({ message: "Error fetching bouquets" });
  }
}

const toggleLike = async (req, res) => {
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
    const { bouquetId, userId } = req.body;

    if (!bouquetId || !userId) {
      return res
        .status(400)
        .json({ error: "Bouquet ID and User ID are required." });
    }

    const bouquet = await Bouquet.findByPk(bouquetId, {
      include: {
        model: User,
        as: "likedBy",
        attributes: ["id"],
      },
    });

    if (!bouquet) {
      return res.status(404).json({ error: "Bouquet not found." });
    }

    const userAlreadyLiked = bouquet.likedBy.some((user) => user.id === userId);

    if (userAlreadyLiked) {
      await bouquet.removeLikedBy(userId);
      bouquet.likes = (bouquet.likes || 0) - 1;
    } else {
      await bouquet.addLikedBy(userId);
      bouquet.likes = (bouquet.likes || 0) + 1;
    }

    await bouquet.save();

    return res.status(200).json({
      message: userAlreadyLiked ? "Like removed." : "Like added.",
      likes: bouquet.likes,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller function to get liked bouquets for a user
// const getUserLikes = async (req, res) => {
//   const { userId } = req.query; // Assume userId is passed in the query params
//   try {
//     const user = await User.findByPk(userId, {
//       include: [{ model: Bouquet, as: "likedBouquets", attributes: ["id"] }],
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const likedBouquetIds = user.likedBouquets.map((b) => b.id);
//     res.json({ likedBouquets: likedBouquetIds });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch liked bouquets" });
//   }
// };

// const getLikes = async (req, res) => {
//   const { bouquetId } = req.params;

//   try {
//     const bouquet = await Bouquet.findByPk(bouquetId, {
//       include: [{ model: User, as: "likedUsers" }],
//     });

//     if (!bouquet) {
//       return res.status(404).json({ message: "Bouquet not found" });
//     }

//     res.json({ likes: bouquet.likedUsers });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching likes", error: error.message });
//   }
// };
// Ajouter un bouquet
const addBouquet = async (req, res) => {
  const { name, description, image, price } = req.body;

  try {
    const bouquet = await Bouquet.create({ name, description, image, price });
    res.status(201).json({ message: "Bouquet ajouté avec succès", bouquet });
  } catch (error) {
    console.error("Erreur lors de l'ajout du bouquet :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
// Modifier un bouquet
const updateBouquet = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price } = req.body;

  try {
    const bouquet = await Bouquet.findByPk(id);

    if (!bouquet) {
      return res.status(404).json({ error: "Bouquet non trouvé" });
    }

    bouquet.name = name || bouquet.name;
    bouquet.description = description || bouquet.description;
    bouquet.image = image || bouquet.image;
    bouquet.price = price || bouquet.price;

    await bouquet.save();
    res.status(200).json({ message: "Bouquet modifié avec succès", bouquet });
  } catch (error) {
    console.error("Erreur lors de la modification du bouquet :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
// Supprimer un bouquet
const deleteBouquet = async (req, res) => {
  const { id } = req.params;

  try {
    const bouquet = await Bouquet.findByPk(id);

    if (!bouquet) {
      return res.status(404).json({ error: "Bouquet non trouvé" });
    }

    await bouquet.destroy();
    res.status(200).json({ message: "Bouquet supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du bouquet :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
module.exports = {
  getBouquetsWithFlowers,

  toggleLike,

  addBouquet,
  updateBouquet,
  deleteBouquet,
};
