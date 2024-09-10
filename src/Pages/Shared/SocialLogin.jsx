import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoLogoGoogleplus } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import useAuth from '../Hooks/useAuth';



const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();

    const location = useLocation()
    const navigate = useNavigate()
    const getState = location?.state || '/'

    const handleSocialLogin = socialProvider =>{
        socialProvider()
        .then((result) => {    
          
            navigate(getState);
                    
          toast.success("Successfully Logged In");
          
        })
        .catch((error) => {
          toast.error(error);
          

        });
      }

    return (
        <>
            <div className="">
              <button onClick={()=>handleSocialLogin(googleLogin)} className=" mb-5 w-full group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800 border-0 rounded-lg focus:ring-2"><span className="items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-md text-sm px-4 py-2 border border-transparent"> <IoLogoGoogleplus className='text-xl mr-3'></IoLogoGoogleplus>
                Login With Google </span>
              </button>
              <button onClick={() => handleSocialLogin(githubLogin)}  type="button" className=" w-full group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800 border-0 rounded-lg focus:ring-2"><span className="items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-md text-sm px-4 py-2 border border-transparent"> <FaGithub className='text-xl mr-3'></FaGithub> Continue with Github</span></button>
            </div>
        </>
    );
};

export default SocialLogin;