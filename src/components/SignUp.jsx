// import React, {useState} from 'react'
// import authServices from '../appwrite/auth/auth'
// import { Link, useNavigate } from 'react-router-dom'
// import { logIn } from '../store/authSlice'
// import {Button, Input, Logo} from './index'
// import { useDispatch } from 'react-redux'
// import {useForm} from 'react-hook-form'

// function SignUp() {

//     const navigate = useNavigate()
//     const [error, setError] = useState("")
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()

//     const create = async(data) => {
//         setError("")
//         try {
//             const Data = await authServices.createAccount(data)
//             if (Data) {
//                 const userData = await authServices.getCurrentUser()
//                 if(userData) dispatch(logIn({userData}));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <div className='flex items-center justify-center w-full' >
//                 <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                         label="Full Name: "
//                         placeholder="Enter your full name"
//                         {...register("name", {
//                             required: true,
//                         })}
//                         />
//                         <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />
//                         <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//     </div>

//   )
// }

// export default SignUp
import React, { useState } from 'react';
import authServices from '../appwrite/auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const create = async(data) => {
    setError("");
    try {
      const userData = await authServices.createAccount(data);
      if (userData) {
        const currentUser = await authServices.getCurrentUser();
        if(currentUser) dispatch(logIn({userData: currentUser}));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
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
            Create Your Account
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            Join our blogging community today
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
            onSubmit={handleSubmit(create)}
            variants={itemVariants}
          >
            <div className="space-y-6">
              <Input 
                label="Full Name"
                placeholder="Enter your full name"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                }
                iconPosition="left"
                error={errors.name?.message}
                {...register("name", {
                  required: "Your name is required",
                  minLength: {
                    value: 2,
                    message: "Name should be at least 2 characters"
                  }
                })}
              />
              
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
                placeholder="Create a strong password"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                }
                iconPosition="left"
                showPasswordToggle={true}
                helpText="Password should be at least 8 characters"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register("terms", {
                    required: "You must agree to the terms and privacy policy"
                  })}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
              )}
              
              <Button 
                type="submit"
                bgColor="bg-blue-600"
                textColor="text-white"
                className="w-full py-2.5"
                loading={isSubmitting}
                loadingText="Creating Account..."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                }
              >
                Create Account
              </Button>
            </div>
          </motion.form>
          
          <motion.div 
            className="mt-6 text-center" 
            variants={itemVariants}
          >
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors duration-200"
              >
                Sign in
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

export default SignUp;