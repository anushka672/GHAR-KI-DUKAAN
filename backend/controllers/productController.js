const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { isAvailable: true };
    if (category && category !== 'all') {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate('creator', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('creator', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
  }
};

// Create product (creators only)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      creator: req.user._id,
      images: []
    });

    res.status(201).json({
      message: 'Product created successfully!',
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
  }
};