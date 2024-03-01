const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Main user schema
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "customer",
      enum: ["admin", "portalAdmin", "customer", "agent"],
    },
    phone: { type: String },
    dob: { type: Date },
    address: { type: String },
    profileImage: { type: String },
    refreshTokens: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
