import React, {useEffect, useState} from 'react'
import appwriteDBService from "../appwrite/database/database"
import appwriteBucketService from "../appwrite/storage/storage"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage }) { //these props come from db service of appwrite no wories
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    appwriteBucketService.getFilePreview(featuredImage)
      .then((url) => {
        console.log(url)
        setImageUrl(url);
      })
      .catch((err) => {
        console.error("Error fetching image preview:", err);
      });
  }, [featuredImage]); 


  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl '>
            <div className='w-full justify-center mb-4 '>
              {imageUrl && <img src={imageUrl} alt={title} />}
              {!imageUrl && <div>No image available</div>} 
            </div>
            
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard