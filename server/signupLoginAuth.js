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

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
    const { username, email, password } = req.body;
    const existingPlayer = await Player.findOne({ username: username }).exec();
    if (existingPlayer) {
      return res.status(500).send("User already exists, choose another name!");
    }
    if (username.length < 4 || username.length > 14) {
      return res.status(500).send("Username should be between 4 and 14 characters.");
    }

    if (password.length < 6 || password.length > 20) {
      return res.status(500).send("Password should be between 6 and 20 characters.");
    }

    if (!validateEmail(email)) {
      return res.status(500).send("Invalid email address.");
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
