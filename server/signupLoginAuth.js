const express = require("express");
const passport = require("passport");
const Player = require("./gameData/playerSchema");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require('dotenv').config();
const router = express.Router();

const uri = process.env.URI;


// connect to mongodb atlas database________________


mongoose.set("strictQuery", false);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database (mongodb atlas) connection established successfully!");
});
//_________________________

router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", async (err, user, info) => {
      if (err) throw err;
      if (!user) {
        return res.send("No such user in the database...");
      }

      req.login(user, async (err) => {
        if (err) throw err;
        res.send("Successfully authenticated!");
        console.log(req.user.username + " logged in");
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

router.post("/signup", async (req, res) => {
  try {
    const existingPlayer = await Player.findOne({ username: req.body.username }).exec();
    if (existingPlayer) {
      return res.send("User already exists, choose another name!");
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const newPlayer = new Player({
      username: req.body.username,
      email: req.body.email,
      password: hashedPw,
    });

    await newPlayer.save();

    req.login(newPlayer, (err) => {
      if (err) throw err;
      res.send("Player has been created! Welcome " + newPlayer.username);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

router.post("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.post("/lobby", async (req, res) => {
  if (req.isAuthenticated()) {
    // const playerId = req.user.id;
    //rejoin game room mechanism
    let playerInGame = null;
    // const game = await Game.findOne({ "players.playerId": playerId });
    // if (game) {
    //   playerInGame = game.gameId;
    // }

    const currentUser = { username: req.user.username, elo: req.user.elo, inGame: playerInGame }; // for displaying user info
    const playersList = await Player.find({}, { username: 1, elo: 1 }); //for displaying the leaderboard

    if (playersList) {
      res.send({ currentUser, playersList });
    }
    
  } else {
    res.json({ string: "not auth" });
  }
});

module.exports = router;
