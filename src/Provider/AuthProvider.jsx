import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { auth } from "../firebase/firebase.config";

import axios from "axios";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext({ user: null, loading: true });


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()
  
  
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const googleLogin = () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  const githubLogin = () =>{
    setLoading(true)
    return signInWithPopup(auth, githubProvider)
  }

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        return result.user;
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        throw error;
      });
  };


  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        return result.user;
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        throw error;
      });
  };
  
  const logOut = async() => {
    setLoading(true)
       return signOut(auth)

      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
        throw error;
      });
  };

  const updateUserData = (name, photo) => {
      return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
    .then(() => {
      setUser((user) => ({
        ...user,
        displayName: name,
        photoURL: photo,
      }));
    })
    .catch((error) => {
      console.error("Error updating user profile:", error.message);
      throw error;
    });
  };
  

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if(currentUser){
        const userInfo = {
          email: currentUser.email
        }
        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
          console.log(res.data.token)
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
          }
        })
      }else{
        localStorage.removeItem('access-token')
      }
      setLoading(false); 
      console.log(currentUser)
    });
  
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);
  
 
 
  const authInfo = {
    user,
    createUser,
    logOut,
    signInUser,
    updateUserData,
    googleLogin,
    githubLogin,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
