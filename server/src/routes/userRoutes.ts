import express from 'express';
import { createUser, getUser, updateUser } from '../controllers/userControllers';

const router = express.Router();

router.get("/:cognitoId", getUser); // get the buyer information
router.post("/", createUser); // cretae Buyer if it doesnt exist
router.put("/:cognitoId", updateUser); // get the buyer information
// router.get("/:cognitoId/shops", getUserShops); // get the buyer information
// router.post("/:cognitoId/favorites/:vendorShopId", addFavoriteShop); // cretae Buyer if it doesnt exist
// router.delete("/:cognitoId/favorites/:vendorShopId", removeFavoriteShop); // cretae Buyer if it doesnt exist

export default router;