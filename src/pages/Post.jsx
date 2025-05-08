// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/database/database";
// import appwriteBucketService from "../appwrite/storage/storage"
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteBucketService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteBucketService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                 </div>
//             </Container>
//         </div>
//     ) : null;
// }
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/database/database";
import appwriteBucketService from "../appwrite/storage/storage";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
            appwriteBucketService.getFilePreview(post.featuredImage)
            .then((url) => {
              setImageUrl(url);
            })
          } else {
            setError("Post not found");
            setTimeout(() => navigate("/"), 3000);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching post:", err);
          setError("Failed to load post");
          setLoading(false);
        });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteBucketService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{error}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Redirecting you to the home page...</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // No post found
  if (!post) return null;

  return (
    <motion.div 
      className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={contentVariants}
        >
          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden shadow-xl mb-8 aspect-video mt-9">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            
            {/* Post date */}
            <div className="absolute top-4 left-4">
              <div className="bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {formatDate(post.$createdAt)}
              </div>
            </div>

            {/* Author actions */}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button 
                    bgColor="bg-green-600" 
                    textColor="text-white"
                    className="!py-1.5 !px-3 text-sm font-medium flex items-center shadow-lg hover:bg-green-700"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                </Link>
                <Button 
                  bgColor="bg-red-600" 
                  textColor="text-white"
                  className="!py-1.5 !px-3 text-sm font-medium flex items-center shadow-lg hover:bg-red-700"
                  onClick={deletePost}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex justify-center items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.$createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* <div className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-lg prose-headings:font-bold prose-a:text-white-500">
              {parse(post.content)}
            </div> */}
              <div className="browser-css text-amber-50">
                 {parse(post.content)}
              </div>
          </motion.div>

          {/* Post navigation */}
          <motion.div 
            className="mt-10 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button
              onClick={() => navigate("/")}
              bgColor="bg-transparent"
              textColor="text-gray-700 dark:text-gray-300"
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 !px-4 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Button>
            {isAuthor && (
              <Link to={`/edit-post/${post.$id}`}>
                <Button 
                  bgColor="bg-blue-600" 
                  textColor="text-white"
                  className="hover:bg-blue-700 !px-4 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit This Post
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </motion.div>
  );
}