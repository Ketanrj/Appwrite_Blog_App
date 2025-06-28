import React from 'react'
import {Postcard, Container} from '../components/index'
import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/crud/service'

export default function Allpost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getAllPosts().then((response) => {
            if(response && response.documents) {
                console.log("Fetched posts:", response.documents); // Log to see the fetched posts
                setPosts(response.documents)
            }
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        })
        .finally(() => {
            setLoading(false)
        });
    }, [])

    

    if (loading) {
        return (
            <div className="w-full py-6">
                <Container>
                    <h1 className="text-2xl font-bold">Loading posts...</h1>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="text-2xl font-bold mb-4">All Posts ({posts.length})</h1>
                {posts.length === 0 && <p>No posts found</p>}
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4 bg-white rounded-md shadow-sm m-2">
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}


