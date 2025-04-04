import React from 'react'
import appwriteDBService from "../appwrite/database/database"
import appwriteBucketService from "../appwrite/storage/storage"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage }) { //these props come from db service of appwrite no wories
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl '>
            <div className='w-full justify-center mb-4 '>
                <img src={appwriteBucketService.getFilePreview(featuredImage)} alt={title} />
            </div>
            
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard