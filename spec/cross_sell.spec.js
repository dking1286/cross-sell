const test = require('tape');

const mongoose = require('mongoose');

const { get, create } = require('../src/interfaces/mongoose_interface')(mongoose);
const crossSell = require('../src/cross_sell')(get);

function initializeDB(mongoose) {
  return Promise.all([
    mongoose.model('coffee_machine').remove({}),
    mongoose.model('coffee_pod').remove({}),
  ]);
}

test('Interface can access the database', (assert) => {
  initializeDB(mongoose)
    .then(() => {
      return create('coffee_machine', {
        sku: 'blah',
        product_type: 'ESPRESSO_MACHINE',
        water_line_compatible: false,
      });
    })
    .then((created) => {
      assert.equal(created.sku, 'blah');
      return get('coffee_machine', {});
    })
    .then((found) => {
      assert.equal(found.length, 1);
      assert.equal(found[0].sku, 'blah');

      return assert.end();
    });
});

test('Cross sell identifies correct items', (assert) => {
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
      crossSellItems.forEach(crossSellItem => {
        assert.equal(crossSellItem.product_type, 'ESPRESSO_POD');
        assert.equal(crossSellItem.pack_size, 36);

        return assert.end();
      });
    })
    .catch(error => assert.end(error));
});



