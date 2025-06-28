import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Button } from '../components';
import conf from '../../connection/conf';
import appwriteService from '../appwrite/crud/service';
import parse from 'html-react-parser';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    console.log("Fetched post:", post); // Log to see what fields are available
                    setPost(post);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (!post) return;
        
        const imageId = post.featured_image;
        if (!imageId) {
            console.log("No image to delete");
            appwriteService.deletePost(post.$id).then(() => navigate("/"));
            return;
        }
        
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(imageId);
                navigate("/");
            }
        });
    };

    const getImagePreview = () => {
        try {
            return `${conf.Endpoint}/storage/buckets/${conf.BucketID}/files/${post.featured_image}/view?project=${conf.ProjectID}`;
        } catch (error) {
            console.error("Error getting image preview:", error);
            return '';
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="w-full flex mb-4 relative rounded-xl ">
                    {post.featured_image && (
                        <img
                            className="w-1/2 h-full object-cover rounded-xl"
                            src={getImagePreview()}
                            alt={post.title}
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 text-black bg-blue-400 border border-gray-500 cursor-pointer shadow-sm">
                                    Edit
                                </Button>
                            </Link>
                            <Button className='border border-gray-600 text-black bg-red-400 cursor-pointer shadow-sm' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}