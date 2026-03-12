const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct
} = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Protected routes (creators only)
router.post('/', protect, restrictTo('creator', 'admin'), createProduct);

module.exports = router;