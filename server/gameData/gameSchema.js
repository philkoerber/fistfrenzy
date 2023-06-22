//mongoose schema and model
const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
  //game meta
  gameId: { type: String, required: true, unique: true },
  gameStatus: { type: String, required: true },
  currentTurn: { type: Number, default: 0 },
  //player information
  players: [
    {
      playerId: { type: String, required: true },
      socketId: { type: String },
      username: { type: String },
      elo: { type: Number },
      score: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);
