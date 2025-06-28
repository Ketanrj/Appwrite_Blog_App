import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import RTE from './RTE'
import appwriteService from '../appwrite/crud/service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Button, Select } from './index'
import conf from '../../connection/conf'

function Postform({...post}) {
    const data = useSelector((state) => state.auth.userData)
    const defaultContent = post?.content || 'Enter your content here';
    const navigate = useNavigate()
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || true ,
        }
    })

    const statusOptions = [
        {label: "Active", value:true},
        {label : "Inactive", value:false}
    ]

    const Submit = async (formData) => {
        console.log("Form data:", formData);
        try {
            // Convert status string to boolean
            const statusValue = formData.status === "true" ? true : false;
            
            if (post && post.$id) {
                const file = formData.image?.[0] ? await appwriteService.uploadFile(formData.image[0]) : null;

                if (file && post.featured_image) {
                    await appwriteService.deleteFile(post.featured_image);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...formData,
                    status: statusValue,
                    featured_image: file ? file.$id : post.featured_image,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!formData.image?.[0]) {
                    throw new Error("Featured image is required");
                }
                const file = await appwriteService.uploadFile(formData.image[0]);

                if (!file) {
                    throw new Error("File upload failed");
                }

                const dbPost = await appwriteService.createPost({
                    title: formData.title,
                    content: formData.content,
                    status: statusValue,
                    featured_image: file.$id,
                    userId: data.$id,
                    slug: formData.slug
                });

                if (!dbPost) {
                    throw new Error("Failed to create post");
                }

                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.log("Submit error:", error.message);
            alert("Something went wrong. Please try again.");
        }
    };


    const slugTransform = useCallback((value) => {
        if(value && typeof(value) === 'string'){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')  // Changed regex pattern
                .replace(/\s/g, '-')
                .replace(/-+/g, '-')      // Added: Replace multiple hyphens with single hyphen
        } 
        return ''
    },[])

    useEffect(()=>{
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                setValue('slug', slugTransform(value.title,
                    {shouldValidate : true}
                ))
            }
        })
        return () => {
            subscription.unsubscribe();
        }

    },[watch, slugTransform, setValue])

    const getImagePreview = () => {
        try {
            return `${conf.Endpoint}/storage/buckets/${conf.BucketID}/files/${post.featured_image}/view?project=${conf.ProjectID}`;
        } catch (error) {
            console.error("Error getting image preview:", error);
            return '';
        }
    };

    return (
        <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={defaultContent} />
            </div>
            <div className="w-1/3 px-2 mb-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-2 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post.featured_image && (
                    <div className="w-full h-1/3">
                        <img
                            src={getImagePreview()}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select 
                    defaultValue={true}
                    options={statusOptions.map((option) => {
                        return {
                            label : option.label,
                            value : option.value
                        }
                    })}
                    label="Status"
                    className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full bg-black text-white">
                    {post.title ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default Postform