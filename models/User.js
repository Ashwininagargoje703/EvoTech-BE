var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = "Ashwini";

const newSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

newSchema.statics.generateAuthToken = async (email) => {
  let payload = email + " " + crypto.randomBytes(20).toString("hex");
  let token = await jwt.sign({ payload }, secretKey, { expiresIn: 86400000 });
  return { token };
};

const User = mongoose.model("User", newSchema);
module.exports = User;
