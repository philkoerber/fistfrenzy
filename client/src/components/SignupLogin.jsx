import React, { useState } from 'react';
import {motion} from "framer-motion"
import Axios from "axios";

const SignupLogin = ({setIsAuth}) => {
  
  const [loginUser, setLoginUser] = useState({});
  const [signupUser, setSignupUser] = useState({});

  const [signupError, setSignupError] = useState("okcool")
  const [loginError, setLoginError] = useState("")


  const handleLoginSubmit = (event) => {
    event.preventDefault();
    Axios({
      method: "post",
      data: loginUser,
      withCredentials: true,
      url: "http://localhost:3001/login",
    })
      .then((res) => {
        setIsAuth(true);
      })
      .catch((err) => {
        if (err.response) {
          setSignupError(err.response.data)
        };
      });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    Axios({
      method: "post",
      data: signupUser,
      withCredentials: true,
      url: "http://localhost:3001/signup",
    })
      .then((res) => {
        setIsAuth(true);
      })
      .catch((err) => {
        if (err.response) {
          setSignupError(err.response.data)
        };

      });
  };

  return (
      <div className="flex flex-col justify-center items-center h-full w-full bg-noise">
      <div className='w-full h-1/5 flex-none flex justify-center items-center'>
        <div className='flex font-verziert font-bold text-transparent bg-clip-text bg-gradient-to-b from-black to-transparent'>
                <p className='text-6xl'>FI$TFRENZY</p>
            </div>
      </div>
      
          
        {/* ===================LOGIN================ */}
          <div className="flex flex-1 w-full justify-center items-center">
      <form onSubmit={handleLoginSubmit} className="w-full max-w-[800px] px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          
          <input
            className="border-b-[1px] border-gray-400 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none"
            id="loginusername"
            type="username"
            placeholder="Username"
            onChange={(event)=>setLoginUser({ ...loginUser, username: event.target.value })}
          />
        </div>
        <div className="mb-6">
          
          <input
            className="border-b-[1px] border-gray-400 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none"
            id="loginpassword"
            type="password"
            placeholder="Password"
            onChange={(event)=>setLoginUser({ ...loginUser, password: event.target.value })}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-500 w-full max-w-[400px] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          
          </div>
          <motion.div
              key={signupError}
              className='text-crimson h-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}>
              {signupError}
            </motion.div>
      </form>
    </div>
      
          {/* ===================OR================ */}

          <div className='flex flex-0 items-center justify-center text-2xl font-bold w-full'>
              <hr className="flex-1 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <p className='flex-1 text-center text-gray-400'>OR</p>
              <hr className="flex-1 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
          </div>
          
      
          {/* ===================SIGNUP================ */}
          <div className="flex flex-1 w-full justify-center items-center">
      <form onSubmit={handleSignupSubmit} className="w-full max-w-[800px] px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          
          <input
            className="border-b-[1px] border-gray-400 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none"
            id="signupemail"
            type="email"
            placeholder="Email"
            onChange={(event)=>setSignupUser({ ...signupUser, email: event.target.value })}
          />
                  </div>
                  <div className="mb-4">
          
          <input
            className="border-b-[1px] border-gray-400 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none"
            id="signupusername"
            type="username"
            placeholder="Username"
            onChange={(event)=>setSignupUser({ ...signupUser, username: event.target.value })}
          />
        </div>
        <div className="mb-6">
          
          <input
            className="border-b-[1px] border-gray-400 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none"
            id="signuppassword"
            type="password"
            placeholder="Password"
            onChange={(event)=>setSignupUser({ ...signupUser, password: event.target.value })}
          />
        </div>
          <div className="flex items-center justify-center">
            
          <button
            className="bg-gray-500 w-full max-w-[400px] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
            </button>
          
          </div>
          <motion.div
              key={signupError}
              className='text-crimson h-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}>
              {signupError}
            </motion.div>
      </form>
    </div>
          
          
    </div>
  );
};

export default SignupLogin;
