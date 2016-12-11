const mongoose = require('mongoose');

const coffeeMachineSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },

  product_type: {
    type: String,
    required: true,
    enum: [
      'COFFEE_MACHINE_LARGE',
      'COFFEE_MACHINE_SMALL',
      'ESPRESSO_MACHINE',
    ],
  },

  water_line_compatible: {
    type: Boolean,
    required: true,
  },
});

const CoffeeMachine = mongoose.model('coffee_machine', coffeeMachineSchema);

module.exports = CoffeeMachine;
