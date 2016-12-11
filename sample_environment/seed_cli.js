const mongoose = require('mongoose');

const db = require('./db');
const CoffeeMachine = require('./models/coffee_machine_model');
const CoffeePod = require('./models/coffee_pod_model');
const seed = require('./seed');

Promise.all([CoffeeMachine.remove({}), CoffeePod.remove({})])
  .then(() => {
    console.log('Removed prior data');
    return seed(mongoose);
  })
  .then(() => {
    console.log('Successfully seeded');
    process.exit();
  })
  .catch(error => console.err(error));
