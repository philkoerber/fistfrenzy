import React from 'react';
import SignupLogin from "./SignupLogin"

function Welcome({setIsAuth}) {
    return (
        <div className='h-full w-full flex'>
            <div className='flex-[0.8] bg-gray-200'>
                <SignupLogin setIsAuth={setIsAuth}/>
            </div>
            <div className='flex-[1.2]'>
            </div>
            </div>
            
        
    );
}

export default Welcome;