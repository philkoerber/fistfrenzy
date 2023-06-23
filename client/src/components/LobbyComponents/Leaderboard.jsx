import React, { useState } from 'react';
import { motion } from "framer-motion";

const tableHeadStyles = "flex-1 p-1 m-1 rounded-md cursor-pointer bg-red-200 w-fit bg-verydarkblue bg-opacity-30"
const tableHeadAnimations = {
    whileTap: {scale: 0.95}
}

const tableBodyStyles = "flex-1 p-1 m-1"


function Leaderboard({ playersList }) {

    const [sortCriteria, setSortCriteria] = useState('elo');
    const [sortOrder, setSortOrder] = useState('asc');
    
    const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      // If the same criteria is clicked again, toggle the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different criteria is clicked, set it as the new sort criteria with ascending order
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  // Create a copy of the playersList array and sort it based on the current criteria and order
  const sortedPlayers = [...playersList].sort((a, b) => {
    if (sortCriteria === 'elo') {
      return sortOrder === 'asc' ? a.elo - b.elo : b.elo - a.elo;
    } else if (sortCriteria === 'username') {
      return sortOrder === 'asc'
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    }
    return 0;
  });


    return (
        <div className='h-full w-full p-2 text-lightblue text-lg'>
            <div className='h-1/8 flex justify-center items-center text-5xl'>LEADERBOARD</div>
            <div className='flex text-xl font-bold mb-2'>
                <motion.div 
                className={tableHeadStyles} 
                {...tableHeadAnimations}
                onClick={() => handleSort('username')}
                >Player</motion.div>
                <motion.div 
                className={tableHeadStyles} 
                {...tableHeadAnimations}
                onClick={() => handleSort('elo')}
                >Points</motion.div>
                <motion.div 
                className={tableHeadStyles} 
                {...tableHeadAnimations}
                onClick={null}
                >Favourite</motion.div>
            </div>

            <div className=''>
                {sortedPlayers.map((player, index) => {
                    const backgroundColor = (index % 2 === 0 ? "bg-verydarkblue" : "");
                  return (
                    <div
                      className={'flex rounded-md bg-opacity-30 ' + backgroundColor}
                      key={index + " player"}>
                            <div className={tableBodyStyles}>{player.username}</div>
                            <div className={tableBodyStyles}>{player.elo}</div>
                            <div className={tableBodyStyles}>Stein</div>
                    </div>
                )})}
            </div>




        </div>
    );
}

export default Leaderboard;