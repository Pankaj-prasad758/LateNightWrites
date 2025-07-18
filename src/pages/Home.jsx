import React, {useState, useEffect} from 'react'
import databasesService from '../appwrite/configService/config-Service'
import {Container, PostCard} from "../component/index"
function Home() {
    console.log("hey this is Home component");
    
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        databasesService.getPosts().then((posts) => {
             if (posts) {
                setPosts(posts.documents)
             }
        })
    }, [])

    if (posts.length === 0) {
        return(
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                         <div className='p-2 w-full'>
                           <h1 className='text-2xl  font-bold hover:text-gray-500'>
                            Login to read posts
                           </h1>
                         </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'> 
           <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => {
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    })
                }

            </div>
           </Container>
        </div>
    )
}

export default Home