const fs = require('fs');
const path = require('path');

module.exports = function seed(mongoose) {
  const seedDataPath = path.join(
    __dirname, 'seed_data', 'seed_data.json'
  );

  const seedData = JSON.parse(fs.readFileSync(seedDataPath));
  console.log('read seed data');

  return Promise.all([
    mongoose.model('coffee_machine').create(seedData.coffee_machine),
    mongoose.model('coffee_pod').create(seedData.coffee_pod),
  ]);
};
