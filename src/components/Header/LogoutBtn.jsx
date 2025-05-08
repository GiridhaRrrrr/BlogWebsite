import React from 'react'
import {useDispatch } from 'react-redux'
import authService from "../../appwrite/auth/auth"
import {logOut} from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();
    const logOutHandler = () => {
        authService.logOut()
        .then(() => {
            dispatch(logOut());
        })
    }

  return (
    <button className='inline-block px-6 py-2 bg-blue-50 duration-200 hover:bg-blue-200 rounded-full'
     onClick={logOutHandler}>
        Logout      
    </button>
  )
}

export default LogoutBtn

// import React from 'react';
// import { motion } from 'framer-motion';

// function Container({ children, className = '', animation = true }) {
//   // Default animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <>
//       {animation ? (
//         <motion.div 
//           className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           {children}      
//         </motion.div>
//       ) : (
//         <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
//           {children}      
//         </div>
//       )}
//     </>
//   );
// }

// export default Container;