const mongoose = require('mongoose');

const redesignRequestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  clothImages: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  desiredProduct: {
    type: String,
    enum: [
      'kurti',
      'bag',
      'cushion cover',
      'crop top',
      'kids dress',
      'scrunchies',
      'quilt',
      'other'
    ],
    required: true
  },
  fabricSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  },
  status: {
    type: String,
    enum: [
      'pending',
      'accepted',
      'in progress',
      'completed',
      'cancelled'
    ],
    default: 'pending'
  },
  laborFee: {
    type: Number,
    default: 0
  },
  specialInstructions: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('RedesignRequest', redesignRequestSchema);