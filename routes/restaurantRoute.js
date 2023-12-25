import express from "express";
import {
  createNewRestaurant,
  deleteRestaurant,
  getAllResturant,
  updateRestaurant,
  getRestaurantProfile,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.route("/").get(getAllResturant).post(createNewRestaurant);

router
  .route("/:id")
  .patch(updateRestaurant)
  .delete(deleteRestaurant)
  .get(getRestaurantProfile);

export default router;
