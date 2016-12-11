const test = require('tape');

const mongoose = require('mongoose');

const dbInterface = require('../src/interfaces/mongoose_interface')(mongoose);
const seed = require('../sample_environment/seed');

const crossSell = require('../src/cross_sell')(dbInterface);

function initializeDB(mongoose) {
  return Promise.all([
    mongoose.model('coffee_machine').remove({}),
    mongoose.model('coffee_pod').remove({}),
  ]).then(() => seed(mongoose));
}


test('Cross sell identifies correct coffee_pods to match a given machine', (assert) => {
  initializeDB(mongoose)
    .then(() => {
      return crossSell({
        sku: 'CM101',
        product_type: 'COFFEE_MACHINE_LARGE',
        style: 'base',
      });
    })
    .then((crossSellItems) => {
      assert.equal(crossSellItems.length, 5);

      const actual = crossSellItems
        .map((item) => {
          return item.sku;
        })
        .sort();

      const expected = [
        'CP101',
        'CP111',
        'CP121',
        'CP131',
        'CP141',
      ];

      assert.deepEqual(actual, expected);

      assert.end();
    })
    .catch(error => assert.end(error));
});

test('Cross sell identifies correct coffee pods to match another coffee pod', (assert) => {
  initializeDB(mongoose)
    .then(() => {
      return crossSell({
        sku: 'EP003',
        product_type: 'ESPRESSO_POD',
        coffee_flavor: 'COFFEE_FLAVOR_VANILLA',
        pack_size: 36,
      });
    })
    .then((crossSellItems) => {
      assert.equal(crossSellItems.length, 5);

      const actual = crossSellItems
        .map(item => item.sku)
        .sort();

      const expected = [
        'EP005',
        'EP007',
        'EP013',
        'EP015',
        'EP017',
      ];

      assert.deepEqual(actual, expected);

      assert.end();
    })
    .catch(error => assert.end(error));
});



