const express = require("express");
const mongoose = require("mongoose");
const Game = require("./gameData/gameSchema");
const Player = require("./gameData/playerSchema");
const router = express.Router();
const io = require("./server");
const { v4: uuid } = require("uuid");



async function findGameById(gameId) {
  try {
    const game = await Game.findOne({ gameId: gameId }).exec();
    return game;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find game by ID");
  }
}

function gameToGameState(game) {
  return {
    player1Score: game.players[0].score,
    player2Score: game.players[1].score,
    currentTurn: game.currentTurn
  }


}

function determineWinner(move1, move2) {
  if (move1 === move2) {
    return "draw";
  } else if (
    (move1 === "rock" && move2 === "scissors") ||
    (move1 === "paper" && move2 === "rock") ||
    (move1 === "scissors" && move2 === "paper")
  ) {
    return "player1";
  } else {
    return "player2";
  }
}

function createGame() {
  const gameId = uuid();

  const newGame = new Game({
    gameId: gameId,
    gameStatus: "waiting",
    currentTurn: null,
    players: [],
    gameBoard: {
      currentTrick: null,
      cardsPlayed: [],
    },
  });

  newGame.join = async function (playerId, socketId) {
    this.players.push({ playerId: playerId, socketId: socketId });
    console.log("assigned user " + playerId + " to game " + this.gameId);
  };

  return newGame;
}

async function startGame(game, io) {
  // ...
  console.log("start game...")
  // Making the game active
  game.gameStatus = "active";

  const playerIds = [game.players[0].socketId, game.players[1].socketId];

  io.to(playerIds[0]).emit("game-started", { gameId: game.gameId, playerNumber: 0 });
  io.to(playerIds[1]).emit("game-started", { gameId: game.gameId, playerNumber: 1 });

  let hands = { player1: null, player2: null };

  // Set up listener for clients while the game is in progress
  game.players.forEach((player, index) => {
    const socket = io.sockets.sockets.get(player.socketId);
    socket.on("playerMove", (hand) => {
      hands = { ...hands, ["player" + (index + 1)]: hand };
    });
  });

  while (game.currentTurn < 100) {
    io.to(playerIds).emit("countdown", gameToGameState(game));

    setTimeout(async () => {
      const result = determineWinner(hands.player1, hands.player2);
      if (result === "player1") {
        game.players[0].score++;
      } else if (result === "player2") {
        game.players[1].score++;
      }

      await game.save();
      io.to(playerIds).emit("showdown", {
        hands,
        result,
        gameState: gameToGameState(game),
      });
      hands = { player1: null, player2: null };
    }, 3000);

    game.currentTurn += 1;
    await game.save();

    await new Promise((resolve) =>
      setTimeout(resolve, 5000)
    );
  }
}


module.exports = function (io) {
  //------------------Lobbying & Find Game------------------
  router.post("/findGame", async (req, res) => {
    const userCookie = req.user.id;
    const socketId = req.body.socketId;
    const player = await Player.findOne({ _id: userCookie }).exec();
    if (player) {
      player.socketId = socketId;
      await player.save();
    }
    const waitingGame = await Game.findOne({ gameStatus: "waiting" }).exec();
    if (waitingGame) {
      //find a waiting game and when found join it
      console.log("assigned player to room: " + waitingGame.gameId);
      waitingGame.players.push({
        playerId: userCookie,
        socketId: socketId,
      });
      await waitingGame.save();

      //if waiting game is now full, start it
      if (waitingGame.players.length == 2) {
        console.log("room " + waitingGame.gameId + " full. starting game...");
        startGame(waitingGame, io);
        res.send({
          gameId: waitingGame.gameId,
        });
      } else {
        res.send({ foundGame: false });
      }
    } else {
      //if no open game, create one and join it
      const newGame = createGame();
      newGame.join(userCookie, socketId);
      await newGame.save();
      console.log(
        "created a new game " + newGame.gameId + " and assigned player"
      );
      res.send({ foundGame: false });
    }
  });

  // router.post("/game", async (req, res) => {
  //   console.log("player " + req.user.username + " opened game route!");

  //   const userCookie = req.user.id;
  //   const socketId = req.body.socketId;
  //   const gameId = req.body.gameId;
  //   const player = await Player.findOne({ _id: userCookie }).exec();
  //   const game = await findGameById(gameId);

  //     if (player && game) {
  //       console.log("lets get the game going!")
  //   }
  // });

  return router;
};
