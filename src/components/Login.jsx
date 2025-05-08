// import React, {useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {logIn as authLogin} from '../store/authSlice' //this is a way of redeclaring the variable from login to auth login
// import {Button, Input, Logo} from './index'
// import {useDispatch } from 'react-redux'
// import authServices from '../appwrite/auth/auth'
// import { useForm } from 'react-hook-form'  //this is from react hook form 

// function Login() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const [error, setError] = useState("");
    
//     const login = async(data) => {
//         setError("")
//         try {

//             let session = await authServices.logIn(data);
//             if(session){
//                 const userData = await authServices.getCurrentUser();
//                 if(userData) dispatch(authLogin({userData}))
//                 navigate("/") //promatically sending the user after login
//             }
            
//         } catch (error) {
//             setError(error);            
//         }

//     }

//   return (
//     <div className='flex items-center justify-center w-full' >
//                 <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border mt-10 mb-10 border-black/10`}>
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//             <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//             <p className="mt-2 text-center text-base text-black/60">
//                 Don&apos;t have any account?&nbsp;
//                 <Link
//                     to="/signup"
//                     className="font-medium text-primary transition-all duration-200 hover:underline"
//                 >
//                     Sign Up
//                 </Link>
//             </p>
//             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//             <form 
//             onSubmit={handleSubmit(login)} 
//             className='mt-8'
//             >
//             {/* //handlesubmit is a event of rect-hook-forms and by this we pass our function login where we defied what to happen if we submit the form
//             //so dont name your function handlesubmit as using register we dont need to manage their states it automatically does that and provides us the data object */}

//             <div className='space-y-5'>
//                 {/* input component */}
//                 <Input 
//                 label = "Email: "
//                 placeholder = "Enter Your Email"
//                 type = "email"
//                 // the register is a method which should always be spread if not it gets overridden
//                 // when again used in any other component and 1st parameter is the fieldname which must
//                 // be unique as it used as key in data we send along with it we can give different options see below
//                 {...register("email", { //options
//                     required: true,
//                     //for validation redux resource regExr
//                     validate: {
//                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                         "Email address must be a valid address",
//                     }                  
//                 })}
//                 />

//                 <Input 
//                 label = "Password: "
//                 type = "password"
//                 placeholder = "Enter your password"
//                 {...register("password", {
//                     required: true,
//                 })}
//                 />
//                 <Button 
//                 type = 'submit'
//                 className = "w-full">
//                     Sign-In
//                 </Button>
//             </div>

//             </form>
//         </div>      
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logIn as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authServices from '../appwrite/auth/auth';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async(data) => {
    setError("");
    try {
      let session = await authServices.logIn(data);
      if(session) {
        const userData = await authServices.getCurrentUser();
        if(userData) dispatch(authLogin({userData}));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Failed to login. Please check your credentials.");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10">
          <motion.div className="flex justify-center mb-6" variants={itemVariants}>
            <Logo width="120px" />
          </motion.div>
          
          <motion.h2 
            className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-2"
            variants={itemVariants}
          >
            Welcome Back
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            Sign in to your account to continue
          </motion.p>
          
          {error && (
            <motion.div 
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </motion.div>
          )}
          
          <motion.form 
            onSubmit={handleSubmit(login)}
            variants={itemVariants}
          >
            <div className="space-y-6">
              <Input 
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                iconPosition="left"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) => 
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Please enter a valid email address"
                  }
                })}
              />
              
              <Input 
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                }
                iconPosition="left"
                showPasswordToggle={true}
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required"
                })}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <Button 
                type="submit"
                bgColor="bg-blue-600"
                textColor="text-white"
                className="w-full py-2.5"
                loading={isSubmitting}
                loadingText="Signing in..."
              >
                Sign in
              </Button>
            </div>
          </motion.form>
          
          <motion.div 
            className="mt-6 text-center" 
            variants={itemVariants}
          >
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6"
            variants={itemVariants}
          >
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Terms</span>
                <span className="text-xs">Terms of Service</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Privacy</span>
                <span className="text-xs">Privacy Policy</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Help</span>
                <span className="text-xs">Help Center</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;