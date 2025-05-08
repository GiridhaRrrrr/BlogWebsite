// // import React from 'react'

// // function Logo({width = "100px"}) {
// //   return (
// //     <div>
// //       Logo
// //     </div>
// //   )
// // }

// // export default Logo

// import React from 'react';
// import { motion } from 'framer-motion';

// function Logo({ width = "100px", animated = true }) {
//   const logoVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { 
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const LogoContent = () => (
//     <div className="flex items-center" style={{ width }}>
//       <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
//         {/* Book/Document Icon */}
//         <path 
//           d="M28 6H12C9.79086 6 8 7.79086 8 10V30C8 32.2091 9.79086 34 12 34H28C30.2091 34 32 32.2091 32 30V10C32 7.79086 30.2091 6 28 6Z" 
//           fill="#4F46E5" 
//           fillOpacity="0.2"
//         />
//         <path 
//           d="M28 6H12C9.79086 6 8 7.79086 8 10V30C8 32.2091 9.79086 34 12 34H28C30.2091 34 32 32.2091 32 30V10C32 7.79086 30.2091 6 28 6Z" 
//           stroke="#4F46E5" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         />
        
//         {/* Text lines */}
//         <path 
//           d="M14 14H26" 
//           stroke="#4F46E5" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         />
//         <path 
//           d="M14 20H26" 
//           stroke="#4F46E5" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         />
//         <path 
//           d="M14 26H22" 
//           stroke="#4F46E5" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         />
        
//         {/* Pen */}
//         <path 
//           d="M36 10L44 18" 
//           stroke="#4F46E5" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         />
//         <path 
//           d="M43 11L35 19" 
//           stroke="#4F46E5" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         />
        
//         {/* Text */}
//         <path 
//           d="M54.864 26V14.8H58.992C60.264 14.8 61.296 15.016 62.088 15.448C62.88 15.88 63.456 16.48 63.816 17.248C64.176 18.016 64.356 18.904 64.356 19.912C64.356 20.92 64.176 21.808 63.816 22.576C63.456 23.344 62.88 23.944 62.088 24.376C61.296 24.792 60.264 25 58.992 25H56.244V26H54.864ZM56.244 23.8H58.92C59.88 23.8 60.648 23.632 61.224 23.296C61.8 22.96 62.208 22.496 62.448 21.904C62.688 21.296 62.808 20.632 62.808 19.912C62.808 19.192 62.688 18.536 62.448 17.944C62.208 17.336 61.8 16.864 61.224 16.528C60.648 16.176 59.88 16 58.92 16H56.244V23.8Z" 
//           fill="#4F46E5"
//         />
//         <path 
//           d="M66.944 26V14.8H68.324V20.056H74.852V14.8H76.232V26H74.852V21.256H68.324V26H66.944Z" 
//           fill="#4F46E5"
//         />
//         <path 
//           d="M83.388 26.144C82.38 26.144 81.484 25.952 80.7 25.568C79.932 25.168 79.324 24.624 78.876 23.936C78.444 23.232 78.228 22.424 78.228 21.512C78.228 20.6 78.444 19.8 78.876 19.112C79.324 18.408 79.932 17.864 80.7 17.48C81.484 17.08 82.38 16.88 83.388 16.88C84.396 16.88 85.284 17.08 86.052 17.48C86.836 17.864 87.444 18.408 87.876 19.112C88.324 19.8 88.548 20.6 88.548 21.512C88.548 22.424 88.324 23.232 87.876 23.936C87.444 24.624 86.836 25.168 86.052 25.568C85.284 25.952 84.396 26.144 83.388 26.144ZM83.388 24.944C84.14 24.944 84.788 24.8 85.332 24.512C85.876 24.224 86.3 23.816 86.604 23.288C86.908 22.76 87.06 22.168 87.06 21.512C87.06 20.856 86.908 20.264 86.604 19.736C86.3 19.208 85.876 18.8 85.332 18.512C84.788 18.224 84.14 18.08 83.388 18.08C82.636 18.08 81.988 18.224 81.444 18.512C80.9 18.8 80.476 19.208 80.172 19.736C79.868 20.264 79.716 20.856 79.716 21.512C79.716 22.168 79.868 22.76 80.172 23.288C80.476 23.816 80.9 24.224 81.444 24.512C81.988 24.8 82.636 24.944 83.388 24.944Z" 
//           fill="#4F46E5"
//         />
//         <path 
//           d="M95.1871 26.144C94.1631 26.144 93.2591 25.952 92.4751 25.568C91.7071 25.168 91.1071 24.624 90.6751 23.936C90.2431 23.232 90.0271 22.424 90.0271 21.512C90.0271 20.6 90.2431 19.8 90.6751 19.112C91.1071 18.408 91.7071 17.864 92.4751 17.48C93.2591 17.08 94.1631 16.88 95.1871 16.88C96.2111 16.88 97.1071 17.08 97.8751 17.48C98.6591 17.864 99.2591 18.408 99.6751 19.112C100.107 19.8 100.323 20.6 100.323 21.512C100.323 22.424 100.107 23.232 99.6751 23.936C99.2591 24.624 98.6591 25.168 97.8751 25.568C97.1071 25.952 96.2111 26.144 95.1871 26.144ZM95.1871 24.944C95.9391 24.944 96.5871 24.8 97.1311 24.512C97.6751 24.224 98.0991 23.816 98.4031 23.288C98.7071 22.76 98.8591 22.168 98.8591 21.512C98.8591 20.856 98.7071 20.264 98.4031 19.736C98.0991 19.208 97.6751 18.8 97.1311 18.512C96.5871 18.224 95.9391 18.08 95.1871 18.08C94.4351 18.08 93.7871 18.224 93.2431 18.512C92.6991 18.8 92.2751 19.208 91.9711 19.736C91.6671 20.264 91.5151 20.856 91.5151 21.512C91.5151 22.168 91.6671 22.76 91.9711 23.288C92.2751 23.816 92.6991 24.224 93.2431 24.512C93.7871 24.8 94.4351 24.944 95.1871 24.944Z" 
//           fill="#4F46E5"
//         />
//         <path 
//           d="M108.105 16.88C109.113 16.88 109.977 17.072 110.697 17.456C111.433 17.824 111.993 18.36 112.377 19.064C112.777 19.752 112.977 20.56 112.977 21.488C112.977 22.416 112.777 23.232 112.377 23.936C111.993 24.624 111.433 25.16 110.697 25.544C109.977 25.928 109.113 26.12 108.105 26.12C107.097 26.12 106.225 25.928 105.489 25.544C104.753 25.16 104.185 24.624 103.785 23.936C103.401 23.232 103.209 22.416 103.209 21.488C103.209 20.56 103.401 19.752 103.785 19.064C104.185 18.36 104.753 17.824 105.489 17.456C106.225 17.072 107.097 16.88 108.105 16.88ZM108.105 18.104C107.337 18.104 106.673 18.248 106.113 18.536C105.569 18.824 105.145 19.24 104.841 19.784C104.553 20.312 104.409 20.928 104.409 21.632C104.409 22.336 104.553 22.952 104.841 23.48C105.145 24.008 105.569 24.416 106.113 24.704C106.673 24.992 107.337 25.136 108.105 25.136C108.873 25.136 109.529 24.992 110.073 24.704C110.617 24.416 111.033 24.008 111.321 23.48C111.625 22.952 111.777 22.336 111.777 21.632C111.777 20.928 111.625 20.312 111.321 19.784C111.033 19.24 110.617 18.824 110.073 18.536C109.529 18.248 108.873 18.104 108.105 18.104Z" 
//           fill="#4F46E5"
//         />
//       </svg>
//     </div>
//   );

//   return animated ? (
//     <motion.div
//       variants={logoVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <LogoContent />
//     </motion.div>
//   ) : (
//     <LogoContent />
//   );
// }

// export default Logo;

import React from 'react';
import { motion } from 'framer-motion';

function Logo({ width = "200px", animated = true }) {
  // Animation variants
  const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.7
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  // Split the name into characters for individual animation
  const betaChars = "β";
  const blogChars = "BLOGGING";

  // Render animated or static version
  const LogoContent = () => (
    <div className="flex items-center" style={{ width, height: "auto" }}>
      <div className="flex flex-col justify-center items-center relative">
        {/* Animated or static based on prop */}
        {animated ? (
          <motion.div
            className="flex items-baseline"
            variants={logoContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Beta symbol */}
            <motion.span
              className="text-blue-600 font-bold text-3xl -mr-1"
              variants={letterVariants}
            >
              {betaChars}
            </motion.span>
            
            {/* Blogging text */}
            <div className="flex items-baseline">
              {blogChars.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className={`font-extrabold text-xl ${
                    index < 4 ? 'text-gray-800 dark:text-white' : 'text-blue-600'
                  }`}
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Animated dot */}
            <motion.span
              className="text-blue-600 text-4xl leading-none ml-0.5"
              variants={dotVariants}
              animate="pulse"
              whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
            >
              •
            </motion.span>
          </motion.div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-blue-600 font-bold text-3xl -mr-1">{betaChars}</span>
            <div className="flex">
              {blogChars.split('').map((char, index) => (
                <span
                  key={index}
                  className={`font-extrabold text-xl ${
                    index < 4 ? 'text-gray-800 dark:text-white' : 'text-blue-600'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
            <span className="text-blue-600 text-4xl leading-none ml-0.5">•</span>
          </div>
        )}

        {/* Tagline */}
        {animated ? (
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.span
              className="text-xs italic text-gray-500 dark:text-gray-400"
              variants={pulseVariants}
              animate="pulse"
            >
              Ideas in Motion
            </motion.span>
          </motion.div>
        ) : (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs italic text-gray-500 dark:text-gray-400">
              Ideas in Motion
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Add hover animations for interactive element
  return animated ? (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <LogoContent />
    </motion.div>
  ) : (
    <LogoContent />
  );
}

export default Logo;