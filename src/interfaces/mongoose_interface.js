
module.exports = (mongoose) => {
  return {
    get(collection, properties) {
      return mongoose.model(collection).find(properties);
    },

    create(collection, properties) {
      return mongoose.model(collection).create(properties);
    },
  };
};
