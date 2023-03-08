const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    profile_image: String,
    age: Number, 
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

