// import React, {useState, useEffect} from 'react'
// import appwriteService from "../appwrite/database/database"
// import { Container, PostCard } from '../components'

// function AllPosts() {

//     const [posts, setPosts] = useState([])
//     useEffect(() => {}, [])
//     appwriteService.getAllPosts([]).then((posts) => {//passed empty array means passed some value so no filter will e applied
//         if (posts) {
//             setPosts(posts.documents) //out will be in form of documnets array withname documents
//             // Like this
//             // "total": 123, // Total number of documents matching the query
//             //   "documents": [
//             //     {
//             //       "$id": "some_document_id_1",
//             //       "$collectionId": "your_collection_id",
//             //       "$databaseId": "your_database_id",
//             //       "$createdAt": "2023-10-26T10:00:00.000Z",
//             //       "$updatedAt": "2023-10-26T10:30:00.000Z",
//             //       "$permissions": { ... },
//             //       // Your actual post data fields:
//             //       "title": "My First Post",
//             //       "content": "This is the content...",
//             //       "status": "active",
//             //       "author": "user_id_123"
//             //     },
//         }
//     })

//   return (
//     <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </Container>
//     </div>
//   )
// }

// export default AllPosts

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/database/database";
import { Container, PostCard } from '../components';
import { motion } from 'framer-motion';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'active', label: 'Published' },
    { id: 'inactive', label: 'Drafts' }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    appwriteService.getAllPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      });
  };

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.status === activeFilter);

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

  return (
    <motion.div 
      className="w-full py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Your Blog Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage all your blog posts in one place. View, edit, or create new content.
          </p>
        </motion.div>

        <motion.div 
          className="mb-8 flex flex-wrap justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex space-x-2 mb-4 sm:mb-0">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <Link 
            to="/add-post"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Post
          </Link>
        </motion.div>

        {loading ? (
          <div className="w-full py-20 flex justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-12 w-12 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600 dark:text-gray-400">Loading posts...</span>
            </div>
          </div>
        ) : error ? (
          <div className="w-full py-16 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">{error}</h3>
              <button 
                onClick={fetchPosts}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="w-full py-16 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeFilter === 'all' 
                  ? "You haven't created any blog posts yet." 
                  : `You don't have any ${activeFilter === 'active' ? 'published' : 'draft'} posts.`}
              </p>
              <Link 
                to="/add-post"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your First Post
              </Link>
            </div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.$id} 
                className="h-full"
                variants={itemVariants}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredPosts.length > 0 && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              {activeFilter !== 'all' && ` — ${activeFilter === 'active' ? 'Published' : 'Drafts'}`}
            </p>
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
}

export default AllPosts;