const City = require("../database/models/city");

module.exports = {
  Query: {
    cities: async (_, { city }) => {
      console.log("cities");
      try {
        const result = await City.find({
          name: new RegExp(city, "i"),
        });
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
