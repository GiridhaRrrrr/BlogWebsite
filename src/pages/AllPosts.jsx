import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/database/database"
import { Container, PostCard } from '../components'

function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getAllPosts([]).then((posts) => {//passed empty array means passed some value so no filter will e applied
        if (posts) {
            setPosts(posts.documents) //out will be in form of documnets array withname documents
            // Like this
            // "total": 123, // Total number of documents matching the query
            //   "documents": [
            //     {
            //       "$id": "some_document_id_1",
            //       "$collectionId": "your_collection_id",
            //       "$databaseId": "your_database_id",
            //       "$createdAt": "2023-10-26T10:00:00.000Z",
            //       "$updatedAt": "2023-10-26T10:30:00.000Z",
            //       "$permissions": { ... },
            //       // Your actual post data fields:
            //       "title": "My First Post",
            //       "content": "This is the content...",
            //       "status": "active",
            //       "author": "user_id_123"
            //     },
        }
    })

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts
