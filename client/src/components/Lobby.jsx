import React, { useEffect, useState } from 'react';
import Leaderboard from './LobbyComponents/Leaderboard';
import Axios from 'axios';
import GameButtons from './LobbyComponents/GameButtons';
import useFistStore from './fistStore';

const boxStyles = "bg-darkblue"

function Lobby(props) {

    const [playersList, setPlayersList] = useState([])
    const [user, setUser] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false) //true if looking for game

    const { socket, connectToSocket, disconnectSocket, setGameId } = useFistStore();

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
      setLoadingButton(!res.data.foundGame);
    });
    };

    return (
        <div className='h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <div className={boxStyles + ''}>
                <GameButtons
                    user={user}
                    handleGameButton={() => handleGameButton()}
                    loadingButton={loadingButton} />
            </div>
            <div className={boxStyles + ''}>
                <Leaderboard playersList={playersList} />
            </div>
            <div className={boxStyles + ''}>
                
            </div>
            <div className={boxStyles + ''}>
            </div>
        </div>
    );
}

export default Lobby;