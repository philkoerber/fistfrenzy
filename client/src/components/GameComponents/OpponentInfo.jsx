import React, { useEffect } from 'react';
import useFistStore from '../fistStore';

function OpponentInfo(props) {

    const { opponent } = useFistStore();


    return (
        <div className='text-center text-verydarkblue'>
            <div className='text-5xl'>{opponent.username}</div>
            <div>{opponent.elo}</div>
        </div>
    );
}

export default OpponentInfo;