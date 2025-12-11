const express = require('express');
const { 
  createRestaurant, 
  getRestaurants, 
  getRestaurant, 
  updateRestaurant,
  getMyRestaurants 
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

const router = express.Router();

router.route('/')
  .get(getRestaurants)
  .post(protect, authorize('restaurant_owner', 'admin'), createRestaurant);

router.get('/owner/me', protect, authorize('restaurant_owner', 'admin'), getMyRestaurants);

router.route('/:id')
  .get(getRestaurant)
  .put(protect, authorize('restaurant_owner', 'admin'), updateRestaurant);

module.exports = router;