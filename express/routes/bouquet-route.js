const express = require("express");
const {
  getBouquetsWithFlowers,
  addBouquet,
  toggleLike,
  updateBouquet,

  deleteBouquet,
} = require("../controllers/bouquet-controller");

const router = express.Router();

//  route to get all bouquets with their flowers
router.get("/api/bouquets", getBouquetsWithFlowers);

// Modifier un bouquet
router.put("/bouquet/:id", updateBouquet);

// Supprimer un bouquet
router.delete("/bouquet/:id", deleteBouquet);
// //All Likes
router.post("/like", toggleLike);
router.post("/create", addBouquet);

// router.get("/:bouquetId/likes", getLikes);

module.exports = router;
