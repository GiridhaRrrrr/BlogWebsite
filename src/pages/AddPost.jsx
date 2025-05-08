// // import React from 'react'
// // import { Container, PostForm } from '../components'

// // function AddPost() {
// //   return (
// //     <div className='py-8'>
// //         <Container>
// //             <PostForm />
// //         </Container>
      
// //     </div>
// //   )
// // }

// // export default AddPost

// import React from 'react';
// import { Container, PostForm } from '../components';
// import { motion } from 'framer-motion';

// function AddPost() {
//   // Animation variants
//   const pageVariants = {
//     initial: { opacity: 0 },
//     animate: { 
//       opacity: 1,
//       transition: { duration: 0.5 }
//     },
//     exit: { 
//       opacity: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   const headerVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.5,
//         delay: 0.2
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//     >
//       <Container>
//         <motion.div
//           className="mb-8 text-center"
//           variants={headerVariants}
//           initial="initial"
//           animate="animate"
//         >
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
//             Create New Post
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Share your thoughts, ideas, and stories with the world. Use the form below to create your blog post.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           <PostForm />
//         </motion.div>

//         <motion.div 
//           className="mt-10 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//             </svg>
//             Tips for a Great Blog Post
//           </h3>
//           <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-7 list-disc">
//             <li>Use an engaging title that grabs attention</li>
//             <li>Include a high-quality featured image</li>
//             <li>Structure your content with headings and paragraphs</li>
//             <li>Proofread before publishing to catch any errors</li>
//             <li>Set status to "Draft" if you're not ready to publish yet</li>
//           </ul>
//         </motion.div>
//       </Container>
//     </motion.div>
//   );
// }

// export default AddPost;

import React from 'react';
import { Container, PostForm } from '../components';
import { motion } from 'framer-motion';

function AddPost() {
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Container>
        <motion.div
          className="mb-8 text-center"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Post
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Share your thoughts, ideas, and stories with the world. Use the form below to create your blog post.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PostForm />
        </motion.div>

        <motion.div 
          className="mt-10 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tips for a Great Blog Post
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-7 list-disc">
            <li>Use an engaging title that grabs attention</li>
            <li>Include a high-quality featured image</li>
            <li>Structure your content with headings and paragraphs</li>
            <li>Proofread before publishing to catch any errors</li>
            <li>Set status to "Draft" if you're not ready to publish yet</li>
          </ul>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default AddPost;