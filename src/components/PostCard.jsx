// import React, {useEffect, useState} from 'react'
// import appwriteDBService from "../appwrite/database/database"
// import appwriteBucketService from "../appwrite/storage/storage"
// import { Link } from 'react-router-dom'

// function PostCard({$id, title, featuredImage }) { //these props come from db service of appwrite no wories
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     appwriteBucketService.getFilePreview(featuredImage)
//       .then((url) => {
//         console.log(url)
//         setImageUrl(url);
//       })
//       .catch((err) => {
//         console.error("Error fetching image preview:", err);
//       });
//   }, [featuredImage]); 


//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl '>
//             <div className='w-full justify-center mb-4 '>
//               {imageUrl && <img src={imageUrl} alt={title} />}
//               {!imageUrl && <div>No image available</div>} 
//             </div>
            
//             <h2 className='text-xl font-bold'>{title}</h2>
//         </div>
//     </Link>
//   )
// }

// export default PostCard
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import appwriteBucketService from "../appwrite/storage/storage";

function PostCard({ $id, title, featuredImage, content = '', createdAt }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (featuredImage) {
      appwriteBucketService.getFilePreview(featuredImage)
        .then((url) => {
          setImageUrl(url);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching image preview:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [featuredImage]);

  // Format post date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Truncate content for preview
  const truncateContent = (text, maxLength = 120) => {
    // Remove HTML tags if content contains them
    const plainText = text.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    return plainText.substr(0, maxLength).trim() + '...';
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={`/post/${$id}`} className="block h-full">
        <motion.div 
          className="w-full h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden aspect-video">
            {isLoading ? (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            ) : imageUrl ? (
              <div className="w-full h-full">
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <svg 
                  className="h-16 w-16 text-gray-400 dark:text-gray-500" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            )}

            {/* Post date badge */}
            {createdAt && (
              <div className="absolute top-4 right-4">
                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {formatDate(createdAt)}
                </div>
              </div>
            )}
          </div>

          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            
            {content && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {truncateContent(content)}
              </p>
            )}

            <div className="flex justify-between items-center pt-2 mt-auto">
              <div className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center group">
                Read More
                <svg 
                  className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              
              {/* Optional: Add post engagement metrics or category tags here */}
              <div className="flex space-x-3">
                <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default PostCard;