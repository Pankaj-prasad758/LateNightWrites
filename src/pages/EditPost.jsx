import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import databasesService from '../appwrite/configService/config-Service'
import { Container, PostForm } from '../component/index'

function EditPage() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            databasesService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
     <Container>
        <PostForm post={post}/>
     </Container>
    </div>
  ) : null
}

export default EditPage