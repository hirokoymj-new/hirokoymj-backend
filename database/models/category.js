const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
