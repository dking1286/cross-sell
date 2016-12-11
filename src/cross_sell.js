module.exports = (dbInterface) => (currentlyViewing) => {
  const category = getProductCategory(currentlyViewing);
  const compatibilityType = getCompatibilityType(currentlyViewing);

  switch (category) {
    case 'MACHINE':
      return dbInterface.get('coffee_pod', {
        product_type: new RegExp(compatibilityType),
        pack_size: 12,
      });

    case 'POD':
      return dbInterface.get('coffee_pod', {
        $and: [
          { product_type: new RegExp(compatibilityType) },
          { $or: [
            { pack_size: { $ne: currentlyViewing.pack_size } },
            { coffee_flavor: { $ne: currentlyViewing.coffee_flavor } },
          ] },
        ],
      });

    default:
      throw new Error(
        `Invalid currentlyViewing data in crossSell: ${currentlyViewing}`);
  }
};

function getProductCategory(currentlyViewing) {
  if (currentlyViewing.product_type.match(/POD/)) {
    return 'POD';
  } else if (currentlyViewing.product_type.match(/MACHINE/)) {
    return 'MACHINE';
  }

  return null;
}

function getCompatibilityType(currentlyViewing) {
  if (currentlyViewing.product_type.match(/LARGE/)) return 'LARGE';
  else if (currentlyViewing.product_type.match(/SMALL/)) return 'SMALL';
  else if (currentlyViewing.product_type.match(/ESPRESSO/)) return 'ESPRESSO';

  return null;
}
