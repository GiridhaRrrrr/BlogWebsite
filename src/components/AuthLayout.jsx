// // this component is used to prodect routes its like container where user if logged in only can enter the routes
// import React, {useEffect, useState} from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// export default function Protected({children, authentication = true}) {// filenameand function name can be different 

//     const navigate = useNavigate();
//     const authStatus = useSelector((state) => state.auth.status);
//     const [loding, setloading] = useState(true);

//     useEffect(() => { //understand it on your own 
//         //will understand better during the routing part
//         if(authentication && authentication !== authStatus){
//             navigate('/login')
//         }
//         else if(!authentication && authentication !== authStatus){
//             navigate('/')
//         }

//         setloading(false);
//     }, [authStatus, navigate, authentication])
    

//   return loding ? <p>Loading...</p> : <>{children}</>
// }

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect logic
    if (authentication && authentication !== authStatus) {
      navigate('/login');
    } else if (!authentication && authentication !== authStatus) {
      navigate('/');
    }

    // Short delay for smoother transitions
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [authStatus, navigate, authentication]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Loading animation
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <svg 
            className="w-12 h-12 mx-auto mb-3 text-blue-500 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading your content...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}