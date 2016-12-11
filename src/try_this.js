const mongoose = require('mongoose');
const db = require('../sample_environment/db');
const CoffeeMachine = require('../sample_environment/models/coffee_machine_model');
const CoffeePod = require('../sample_environment/models/coffee_pod_model');

const { get, create } = require('../src/interfaces/mongoose_interface')(mongoose);
const crossSell = require('../src/cross_sell')(get);

function initializeDB(mongoose) {
  return Promise.all([
    mongoose.model('coffee_machine').remove({}),
    mongoose.model('coffee_pod').remove({}),
  ]);
}

initializeDB(mongoose)
  .then(() => create('coffee_pod', {
    sku: 'blah',
    product_type: 'ESPRESSO_POD',
    coffee_flavor: 'COFFEE_FLAVOR_VANILLA',
    pack_size: 12,
  }))
  .then(created => create('coffee_pod', {
      sku: 'blah',
      product_type: 'ESPRESSO_POD',
      coffee_flavor: 'COFFEE_FLAVOR_VANILLA',
      pack_size: 36,
  }))
  .then(created => crossSell({
      sku: 'blah',
      product_type: 'ESPRESSO_POD',
      coffee_flavor: 'COFFEE_FLAVOR_VANILLA',
      pack_size: 12,
  }))
  .then(crossSellItems => {
      console.log(crossSellItems);
  })
  .catch(error => console.err(error));

// CoffeeMachine.create([{
//   sku: 'blah',
//   product_type: 'ESPRESSO_MACHINE',
//   water_line_compatible: false,
// },
// {
//   sku: 'blah2',
//   product_type: 'ESPRESSO_MACHINE',
//   water_line_compatible: false,
// },
// {
//   sku: 'blah3',
//   product_type: 'ESPRESSO_MACHINE',
//   water_line_compatible: false,
// }
// ])
//   .then(coffeeMachines => {
//       console.log('created', coffeeMachines)
//       return CoffeeMachine.find({})    
//   })
//   .then(found => {
//     console.log('found', found);
//   })