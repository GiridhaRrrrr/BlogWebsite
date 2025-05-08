// import React, {useEffect, useState} from 'react'
// import {Container, PostForm} from '../components'
// import appwriteService from "../appwrite/database/database";
// import { useNavigate,  useParams } from 'react-router-dom';

// function EditPost() {
//     const [post, setPosts] = useState(null)
//     const {slug} = useParams() //to take id from url
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) {
//                     setPosts(post)
//                 }
//             })
//         } else {
//             navigate('/')
//         }
//     }, [slug, navigate])
//   return post ? (
//     <div className='py-8'>
//         <Container>
//             <PostForm post={post} />
//         </Container>
//     </div>
//   ) : null
// }

// export default EditPost
import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/database/database";
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            setError("Post not found");
            setTimeout(() => navigate('/all-posts'), 3000);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          setError("Failed to load the post. Please try again.");
          setLoading(false);
        });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

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

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading post details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{error}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Redirecting you to All Posts...</p>
              <button
                onClick={() => navigate('/all-posts')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Go to All Posts
              </button>
            </div>
          </div>
        </Container>
      </motion.div>
    );
  }

  return post ? (
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
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Edit Post
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Make changes to your post "{post.title}" and update it when you're ready.
          </p>
        </motion.div>

        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          <PostForm post={post} />
        </motion.div>

        <motion.div 
          className="mt-8 flex justify-center"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          <button
            onClick={() => navigate(`/post/${post.$id}`)}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View Post
          </button>
        </motion.div>
      </Container>
    </motion.div>
  ) : null;
}

export default EditPost;