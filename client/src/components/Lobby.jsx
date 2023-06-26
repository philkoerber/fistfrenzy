import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Leaderboard from './LobbyComponents/Leaderboard';
import Axios from 'axios';
import GameButtons from './LobbyComponents/GameButtons';
import useFistStore from './fistStore';
import Spinner from './LobbyComponents/Spinner';


const parentBoxProps = {
  className: "bg-darkblue"
}

function Lobby(props) {

    const [playersList, setPlayersList] = useState(null)
    const [user, setUser] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false) //true if looking for game

    const { socket, connectToSocket, disconnectSocket, setGameId } = useFistStore();

  const boxProps = {
      className: "w-full h-full flex justify-center items-center",
      initial: { opacity: 0 },
      animate: {opacity: 1}

      }
  
    useEffect(() => {
    Axios({
      method: "post",
      withCredentials: true,
      credentials: "include",
      url: "http://localhost:3001/lobby",
    }).then((res) => {
      const game = res.data.currentUser.inGame;
      if(game){setGameId(game)}
      else{setUser(res.data.currentUser);
        setPlayersList(res.data.playersList);}
      
    });
    }, []);

    const handleGameButton = () => {
    Axios({
      method: "post",
      withCredentials: true,
      credentials: "include",
      url: "http://localhost:3001/findGame",
      data: { socketId: socket.id },
    }).then((res) => {
      console.log(res)
      setLoadingButton(!res.data.foundGame);
    });
    };

    return (
      <div className='h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <div {...parentBoxProps}>
          <motion.div
          {...boxProps}
          key={user}>
          {user ?
            <GameButtons
                    user={user}
                    handleGameButton={() => handleGameButton()}
                    loadingButton={loadingButton} />
            :
            <Spinner/>
                }
                
            </motion.div>
        </div>
        
        <div {...parentBoxProps}>
                <motion.div
          {...boxProps}
          key={playersList}
        >
          {playersList ?
            <Leaderboard playersList={playersList} />
            :
            <Spinner/>
                }
                
            </motion.div>
        </div>

        <div {...parentBoxProps}>
                <motion.div {...boxProps}>
                <Spinner/>
            </motion.div>
        </div>
        
        <div {...parentBoxProps}>
          <motion.div {...boxProps}>
                <Spinner/>
            </motion.div>
            </div>
        
        </div>
    );
}

export default Lobby;