module.exports = (get) => (currentlyViewing) => {
  const category = getProductCategory(currentlyViewing);
  const compatibilityType = getCompatibilityType(currentlyViewing);

  switch (category) {
    case 'MACHINE':
      return get('coffee_pod', {
        product_type: new Regexp(compatibilityType),
        pack_size: 12,
      });

    case 'POD':
      const otherPackSizes = [12, 36, 60, 84].filter(size =>
        size !== currentlyViewing.pack_size);

      return get('coffee_pod', {
        product_type: new RegExp(compatibilityType),
        pack_size: { $in: otherPackSizes },
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
