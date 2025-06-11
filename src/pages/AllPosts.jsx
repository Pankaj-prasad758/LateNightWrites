import React, { useEffect, useState } from "react";
import databasesService from "../appwrite/configService/config-Service";
import { Container, PostCard } from "../component/index";
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {},[])
    databasesService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (

    <div className="py-8 w-full">
      <Container>
       <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post}/>
            </div>
          ))}
       </div>
      </Container>
    </div>
  )
}

export default AllPosts;
