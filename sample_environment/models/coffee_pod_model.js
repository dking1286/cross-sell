const mongoose = require('mongoose');

const coffeePodSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },

  product_type: {
    type: String,
    required: true,
    enum: [
      'COFFEE_POD_LARGE',
      'COFFEE_POD_SMALL',
      'ESPRESSO_POD',
    ],
  },

  coffee_flavor: {
    type: String,
    required: true,
    enum: [
      'COFFEE_FLAVOR_VANILLA',
      'COFFEE_FLAVOR_CARAMEL',
      'COFFEE_FLAVOR_PSL',
      'COFFEE_FLAVOR_MOCHA',
      'COFFEE_FLAVOR_HAZELNUT',
    ],
  },

  pack_size: {
    type: Number,
    required: true,
    enum: [12, 36, 60, 84],
  },
});

const CoffeePod = mongoose.model('coffee_pod', coffeePodSchema);

module.exports = CoffeePod;
