import { useState, useEffect } from "react";
import Axios from "axios";

import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import Game from "./components/Game";

import useFistStore from "./components/fistStore";



function App() {
  const [isAuth, setIsAuth] = useState(false);
  const {
    gameId,
    setOpponent, 
    setPhase, 
    setGameState, 
    setPlayerNumber, 
    setWinner, 
    setHands, 
    setGameId, 
    connectToSocket
  } = useFistStore()
  
  useEffect(() => {
    connectToSocket((socket) => {
        //setting up event listeners
      socket.on("game-started", (data) => {
          console.log(data.opponent)
          setGameId(data.gameId);
          setPlayerNumber(data.playerNumber);
          setOpponent(data.opponent);
        });
      
      socket.on("countdown", (newState) => {
        setPhase("countdown")
        setHands({player1: null, player2: null})
        setGameState(newState);
      })
      
      socket.on("showdown", ({ hands, result, gameState }) => {
        setPhase("showdown")
        console.log(gameState)
        setGameState(gameState)
        setHands(hands);
        setWinner(result);
      })
      
    });

    Axios({
      method: "post",
      withCredentials: true,
      credentials: "include",
      url: "http://localhost:3001/auth",
    })
      .then((res) => {
        setIsAuth(res.data.isAuthenticated);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="w-screen h-screen min-h-fit bg-verydarkblue bg-noise font-normal">
      {!isAuth
        ?
        <Welcome setIsAuth={setIsAuth} />
        :
        gameId
          ?
            <Game />
         
          :
          <Lobby />}
      
      
    </div>
    
  )
  
}

export default App
