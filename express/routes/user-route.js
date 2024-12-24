const express = require("express");
const {
  getLikedBouquets,
  createTransaction,
  getWishlist,
} = require("../controllers/user-controller");

const router = express.Router();

//  fetch liked bouquets for a user
router.get("/user/:userId/likes", getLikedBouquets);

//add a transaction
router.post("/purchase", createTransaction);
router.get("/:userId/wishlist", getWishlist);
module.exports = router;
