// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/database/database";
// import {Container, PostCard} from '../components'
// import { useSelector } from 'react-redux';

// function Home() {
//     const [posts, setPosts] = useState([])

//     let userStatus = useSelector((state) => state.auth.status)

//     useEffect(() => {
//         appwriteService.getAllPosts().then((posts) => {//here no array is passed so default query filter will be applied
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 {userStatus ? "No Posts found": "Login To Read posts..."}
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/database/database";
import appwriteServiceStorage from "../appwrite/storage/storage";
import parse from "html-react-parser";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    appwriteService.getAllPosts()
      .then((posts) => {
        if (posts && posts.documents.length > 0) {
          // Sort posts by date (newest first)
          const sortedPosts = [...posts.documents].sort((a, b) => 
            new Date(b.$createdAt) - new Date(a.$createdAt)
          );
          
          // Set aside the newest post as featured
          setFeatured(sortedPosts[0]);
          
          // Set the rest as regular posts
          setPosts(sortedPosts.slice(1));
          
        } else {
          setPosts([]);
        }

       setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <Container>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Loading amazing content...</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <Container>
          <div className="flex justify-center items-center py-20">
            <div className="max-w-md text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{error}</h3>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Render empty state for not logged in users
  if (!userStatus && (posts.length === 0 || !posts)) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Our Blogging Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Discover interesting articles, share your thoughts, and connect with others. Sign in to get started and access all content.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/login" 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-lg font-medium"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  // Render empty state for logged in users
  if (userStatus && posts.length === 0 && !featured) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <Container>
          <motion.div 
            className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden my-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Posts Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are no posts available right now. Be the first to create content!
              </p>
              <Link 
                to="/add-post" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your First Post
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  // Main content - with posts
  if(featured.featuredImage){
    appwriteServiceStorage.getFilePreview(featured.featuredImage)
    .then((url) => {
      setImageUrl(url);
    })
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <Container>
        {/* Welcome Message */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {userData ? `Welcome back, ${userData.name.split(' ')[0]}!` : 'Welcome to Our Blog'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the latest thoughts, ideas, and stories from our community.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featured && (
          <motion.div 
            className="mb-16"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                  {imageUrl ? (
                    <img 
                      src={imageUrl}
                      alt={featured.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <svg className="h-20 w-20 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Featured Post
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {featured.title}
                    </h2>
                    {/* <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {featured.content && featured.content.replace(/<[^>]*>/g, '').slice(0, 200)}...
                    </p> */}
                      <div className="browser-css text-blue-300">
                        {parse(featured.content)}
                      </div>
                  </div>
                  <div className="mt-auto">
                    <Link 
                      to={`/post/${featured.$id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Read Full Article
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Posts */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {featured ? 'Recent Posts' : 'All Posts'}
            </h2>
            {userStatus && (
              <Link
                to="/add-post"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Post
              </Link>
            )}
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.div 
                key={post.$id} 
                className="h-full"
                variants={itemVariants}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        {userStatus && posts.length > 0 && (
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link 
              to="/all-posts"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              View All Posts
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </Container>
    </div>
  );
}

export default Home;