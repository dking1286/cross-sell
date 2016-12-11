module.exports = (get) => (currentlyViewing) => {
  const category = getCategory(currentlyViewing);
  const generalType = getGeneralType(currentlyViewing);

  if (currentlyViewing.product_type.match(/MACHINE/)) {
    const matchingCoffeePods = {
      product_type: new Regexp(generalType),
      pack_size: 12,
    };

    return get('coffee_pod', matchingCoffeePods);
  } else if (currentlyViewing.product_type.match(/POD/)) {
    const otherPackSizes = [12, 36, 60, 84].filter((size) => {
      return size !== currentlyViewing.pack_size;
    });

    const matchingCoffeePods = {
      product_type: new RegExp(generalType),
      pack_size: { $in: otherPackSizes },
    };

    return get('coffee_pod', matchingCoffeePods);
  }
};

function getCategory(currentlyViewing) {
  if (currentlyViewing.product_type.match(/COFFEE_POD/)) {
    return 'COFFEE_POD';
  } else if (currentlyViewing.product_type.match(/COFFEE_MACHINE/)) {
    return 'COFFEE_MACHINE';
  }
}

function getGeneralType(currentlyViewing) {
  if (currentlyViewing.product_type.match(/LARGE/)) return 'LARGE';
  else if (currentlyViewing.product_type.match(/SMALL/)) return 'SMALL';
  else if (currentlyViewing.product_type.match(/ESPRESSO/)) return 'ESPRESSO';

  return null;
}
