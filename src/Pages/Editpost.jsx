import React, { useEffect, useState } from 'react'
import { Container, Postform } from '../components/index'
import appwriteService from '../appwrite/crud/service'
import { useNavigate, useParams } from 'react-router-dom'

export default function Editpost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) =>{
                if(post){
                    console.log("Edit",post);
                    setPost(post)
                }else{
                    navigate('/')
                }
            })
    }
    },[slug])

return post ?
    <div className="py-8">
        <Container>
            <Postform {...post} />
        </Container>
    </div> : null
}
