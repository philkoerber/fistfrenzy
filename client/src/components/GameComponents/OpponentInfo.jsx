import React, { useEffect } from 'react';
import useFistStore from '../fistStore';

function OpponentInfo(props) {

    const { opponent } = useFistStore();


    return (
        <div className='w-[200px] h-[100px] bg-gray-300 rounded-b-xl opacity-90 text-center'>
            <div className='text-xl font-bold'>{opponent.username}</div>
            <div>{opponent.elo}</div>
        </div>
    );
}

export default OpponentInfo;