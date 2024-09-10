
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoLogoGoogleplus } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';


const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
const axiosPublic = useAxiosPublic()
   const navigate = useNavigate()
const handleGoogleSignIn = () =>{
  googleLogin()
  .then(result => {
    console.log(result.user)
    const userInfo = {
      name: result.user.displayName,
      email: result.user.email
    }
    axiosPublic.post('/users',userInfo)
    .then(res => {
      console.log(res.data)
      navigate('/')
    })


  })
}
const handleGithubSignIn = () =>{
  githubLogin()
  .then(result => {
    console.log(result.user)
    const userInfo = {
      name: result.user.displayName,
      email: result.user.email
    }
    axiosPublic.post('/users',userInfo)
    .then(res => {
      console.log(res.data)
      navigate('/')
    })


  })
}
    

 

    return (
        <>
            <div className="flex justify-between p-4">
              <button onClick={handleGoogleSignIn} className="btn btn-outline "><span className=""> <IoLogoGoogleplus className='text-xl mr-3'></IoLogoGoogleplus></span>
                Google Login 
              </button>
             
            </div>
        </>
    );
};

export default SocialLogin;