//mongoose schema and model
const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
  socketId: { type: String, default: "" },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  elo: { type: Number, default: 1500 },
  status: { type: String, default: "offline" },
});
module.exports = mongoose.model("Player", playerSchema);
