const { model, Schema } = require("mongoose");

const citySchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    require: true,
  },
  coord: {
    lon: {
      type: Number,
    },
    lat: {
      type: Number,
    },
  },
});

module.exports = model("City", citySchema);
