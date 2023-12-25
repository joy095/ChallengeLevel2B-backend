import Restaurant from "../models/restaurantModel.js";
import asyncHandler from "express-async-handler";

const getAllResturant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.find().lean();

  if (!restaurant?.length) {
    return res.status(400).json({ message: "No restaurant found" });
  }

  res.json(restaurant);
});

const createNewRestaurant = asyncHandler(async (req, res) => {
  const { name, cuisine, address, city, rating } = req.body;

  // Confirm data
  if (!name || !cuisine || !address || !city || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const restaurantObject = { name, cuisine, address, city, rating };

  // Create new restaurant
  const restaurant = await Restaurant.create(restaurantObject);

  if (restaurant) {
    //created
    res.status(201).json({ message: `New restaurant: ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid restaurant data received" });
  }
});

const updateRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Does the user exist to update?
  const restaurant = await Restaurant.findById(id).exec();

  if (!restaurant) {
    return res.status(400).json({ message: "Restaurant not found" });
  }

  restaurant.name = req.body.name || restaurant.name;
  restaurant.cuisine = req.body.cuisine || restaurant.cuisine;
  restaurant.address = req.body.address || restaurant.address;
  restaurant.city = req.body.city || restaurant.city;
  restaurant.rating = req.body.rating || restaurant.rating;

  const updateRestaurant = await restaurant.save();

  res.json({ message: `${updateRestaurant.name} updated` });
});

const deleteRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.findById(req.params.id);
    if (restaurants) {
      await Restaurant.deleteOne({ _id: restaurants._id });

      res.json({
        message: `Restaurants Name ${restaurants.name} with ID ${restaurants._id} removed`,
      });
    } else {
      res.status(404).json({ message: "Restaurants not found." });
    }
  } catch (error) {
    console.log("Error in deleting Restaurant:", error);
  }
};

const getRestaurantProfile = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found.");
  }
});

export {
  createNewRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllResturant,
  getRestaurantProfile,
};
