import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/crud/service'
import { Container, Postcard } from '../components'


export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        appwriteService.getAllPosts()
            .then((post) => {
                console.log("All posts response:", post);
                if(post && post.documents) {
                    console.log("Posts found:", post.documents);
                    setPosts(post.documents)
                }
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if(loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </Container>
            </div>
        )
    }

    if(error) {
        return (
            <div className="w-full py-8">
                <Container>
                    <h1 className="text-2xl font-bold text-red-600">Error: {error}</h1>
                </Container>
            </div>
        )
    }

    if(!posts || posts.length === 0) {
        return (
            <div className="w-full py-8">
                <Container>
                    <h1 className="text-2xl font-bold">No Posts Found</h1>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-6">
            <Container>
                <h1 className="text-xl font-bold ml-4 mb-4">Featured Posts</h1>
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
