// import React, {useEffect, useCallback} from 'react'
// import { useForm } from 'react-hook-form'
// import {Button, Input, SelectField, RTE} from '../index'
// import appwriteDBService from "../../appwrite/database/database"
// import appwriteBucketService from "../../appwrite/storage/storage"
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // this form is used for post and edit also if you want to edit then we must have post details
// // which is sent by the user

// function PostForm({post}) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         // watch provides watching capabilty over a field 
//         // setValue and getValue  to set and get values from child componnets
//         // control is the one which link this parent component to child componenet
//         // inside useForm we can give default values 
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => { //data is given by recat hook form
//         // if we have post means we are editing 
//         if (post) {
//             // first we upload the new image to the bucket if image is there images are in form of array
//             const file = data.image[0] ? await appwriteBucketService.uploadFile(data.image[0]) : null;

//             // if file is present then delete the existing on from the post by passing the image id
//             if (file) {
//                 await appwriteBucketService.deleteFile(post.featuredImage);
//             }

//             // now uodating the post by slug and and data is spread and featured image is overridden if new file is there
//             const dbPost = await appwriteDBService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined, //post.featuredImage can be placed insted of undefined
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`); //navigating user after updating
//             }
//         }else{
//             //new post is getting created
//             // 1st hting is to upload the file
//             const file = await appwriteBucketService.uploadFile(data.image[0]);
//             // todo to handle it better

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
//                 const dbPost = await appwriteDBService.createPost({ ...data, userId: userData.$id });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     }

//     // slug-transform
//     const slugTransform = useCallback((value) => {
//         // if value present then remove spaces and addd - in place of space
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         // any method you write hold it in a variable here we wrote watch method you can also use for login method or others
//         // watch comes from react hook form so in that methid we get value and name.
//         const subscription = watch((value, { name }) => {
//             // value is all the values in the form and name is the one we pass to this watch
//             if (name === "title") {
//                 // use setVlue to set the value of the title acc to this slugTransform
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe(); //completion we unsubscribe helps in memory managementafter 
//     }, [watch, slugTransform, setValue]);

//     // this is asked in interviews where they ask we use useEffect then to optimize it what can we do is use this unsubscribe process
    
    

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//         {/* divide form into 2 parts w-2/3 left part remaining right part */}
//         <div className="w-2/3 px-2"> 
//             <Input
//                 label="Title :"
//                 placeholder="Title"
//                 className="mb-4"
//                 {...register("title", { required: true })}
//             />
//             <Input
//                 label="Slug :"
//                 placeholder="Slug"
//                 className="mb-4"
//                 {...register("slug", { required: true })}
//                 onInput={(e) => {
//                     setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                 }}
//             />
//             <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             {/* the contol we are passing here */}
//         </div>
//         <div className="w-1/3 px-2">
//             <Input
//                 label="Featured Image :"
//                 type="file"
//                 className="mb-4"
//                 accept="image/png, image/jpg, image/jpeg, image/gif"
//                 {...register("image", { required: !post })}
//             />
//             {post && (
//                 <div className="w-full mb-4">
//                     <img
//                         src={appwriteBucketService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-lg"
//                     />
//                 </div>
//             )}
//             <SelectField
//                 options={["active", "inactive"]}
//                 label="Status"
//                 className="mb-4"
//                 {...register("status", { required: true })}
//             />
//             <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                 {post ? "Update" : "Submit"}
//             </Button>
//         </div>
//     </form>
//   )
// }

// export default PostForm

import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, SelectField, RTE } from '../index';
import appwriteDBService from "../../appwrite/database/database";
import appwriteBucketService from "../../appwrite/storage/storage";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function PostForm({ post }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(post ? appwriteBucketService.getFilePreview(post.featuredImage) : null);
  const [dragActive, setDragActive] = useState(false);

  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setIsSubmitting(true);
    try {
      if (post) {
        // Editing existing post
        let fileId = post.featuredImage;
        
        // Upload new image if provided
        if (data.image && data.image[0]) {
          const file = await appwriteBucketService.uploadFile(data.image[0]);
          if (file) {
            // Delete old image
            await appwriteBucketService.deleteFile(post.featuredImage);
            fileId = file.$id;
          }
        }

        // Update post
        const dbPost = await appwriteDBService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Creating new post
        if (data.image && data.image[0]) {
          const file = await appwriteBucketService.uploadFile(data.image[0]);
          
          if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await appwriteDBService.createPost({ ...data, userId: userData.$id });

            if (dbPost) {
              navigate(`/post/${dbPost.$id}`);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Slug transformation
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  // Watch for title changes to update slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // At least one file has been dropped
      setValue("image", e.dataTransfer.files);
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {post ? "Edit Post" : "Create New Post"}
      </h2>
      
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-3">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 px-3">
          <motion.div variants={itemVariants} className="mb-6">
            <Input
              label="Title"
              placeholder="Enter post title"
              className="mb-1"
              {...register("title", { 
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title should be at least 5 characters"
                }
              })}
              error={errors.title?.message}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <Input
              label="Slug"
              placeholder="post-url-slug"
              className="mb-1"
              {...register("slug", { 
                required: "Slug is required",
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: "Invalid slug format"
                }
              })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
              error={errors.slug?.message}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              The slug is used for your post's URL. It will be automatically generated from the title.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <RTE 
              label="Content" 
              name="content" 
              control={control} 
              defaultValue={getValues("content")} 
              rules={{ required: "Content is required" }}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 px-3">
          <motion.div 
            variants={itemVariants} 
            className="mb-6"
            onDragEnter={handleDrag}
          >
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              Featured Image
            </label>
            
            <div 
              className={`border-2 border-dashed rounded-lg ${
                dragActive 
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                : "border-gray-300 dark:border-gray-600"
              } transition-colors duration-200 relative`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { 
                  required: !post && "Featured image is required",
                  onChange: handleImageChange
                })}
              />
              
              <div className="p-4 text-center">
                {previewImage ? (
                  <div className="mb-3">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="mx-auto h-40 rounded-lg object-cover" 
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 my-8">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path 
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                        strokeWidth={2} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                )}
                
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <span className="relative rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    {previewImage ? "Click to change image" : "Upload a file"}
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG or GIF up to 5MB
                </p>
              </div>
            </div>
            
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <SelectField
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "inactive" }
              ]}
              label="Status"
              className="mb-2"
              {...register("status", { required: "Status is required" })}
              error={errors.status?.message}
            />
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Set to 'Draft' if you're not ready to publish yet.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              disabled={isSubmitting}
              bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} 
              className="w-full flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {post ? "Updating..." : "Submitting..."}
                </>
              ) : (
                <>
                  {post ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Update Post
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Publish Post
                    </>
                  )}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}

export default PostForm;
