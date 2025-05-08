// import React from 'react'

// // we genrally use this component so that when ever  we want to change the width of the component
// // simple we change the width of container where ever it is used will also change

// function container({children}) {
//   return <div className='w-full max-w-7xl mx-auto px-4'>
//           {children}      
//         </div>;
// }

// export default container


import React from 'react';
import { motion } from 'framer-motion';

function Container({ children, className = '', animation = true }) {
  // Default animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {animation ? (
        <motion.div 
          className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {children}      
        </motion.div>
      ) : (
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
          {children}      
        </div>
      )}
    </>
  );
}

export default Container;