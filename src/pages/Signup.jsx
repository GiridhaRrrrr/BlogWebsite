// import React from 'react'
// import { SignUp as SIgnupComponent } from '../components'

// function Signup() {
//   return (
//     <div className='py-8'>
//         <SIgnupComponent />
//     </div>
//   )
// }

// export default Signup
import React from 'react';
import { SignUp as SignUpComponent } from '../components';
import { motion } from 'framer-motion';

function Signup() {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-5 z-0">
        <svg 
          className="absolute left-0 top-0 transform -translate-x-1/3 -translate-y-1/3" 
          width="800" 
          height="800" 
          fill="none" 
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="400" fill="currentColor" />
        </svg>
        <svg 
          className="absolute right-0 bottom-0 transform translate-x-1/3 translate-y-1/3" 
          width="800" 
          height="800" 
          fill="none" 
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="400" fill="currentColor" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <SignUpComponent />
      </div>
      
      <motion.div 
        className="fixed bottom-6 right-6 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-md rounded-lg px-4 py-2 opacity-80 hover:opacity-100 transition-opacity"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Join our community of writers and creators.
      </motion.div>
    </motion.div>
  );
}

export default Signup;