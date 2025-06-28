import React from 'react'
import appwriteService from '../appwrite/crud/service'
import { Link } from 'react-router-dom'
import conf from '/Users/Dell/Desktop/React/Appwrite_Blog_App/connection/conf'
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function Postcard({$id, title,content, featured_image}) {
  const userData = useSelector((state)=> state.auth.userData);
  console.log(userData)
  const getImageUrl = () => {
    return `${conf.Endpoint}/storage/buckets/${conf.BucketID}/files/${featured_image}/view?project=${conf.ProjectID}`;
  };
  
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full rounded-b-lg p-2">
          <div className="w-full justify-center mb-4">
            {featured_image ? (
              <img 
                src={getImageUrl()} 
                alt={title} 
                className='rounded-md w-full h-48 object-cover'
                onError={(e) => {
                  console.error('Image load error:', e);
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = '<div class="h-48 bg-gray-200 rounded-md flex items-center justify-center"><p class="text-gray-500">Error loading image</p></div>';
                }}
              />
            ) : (
              <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
          <h2 className='text-lg font-medium'>{title}</h2>
          <div className="mt-2">
            <h4 className='text-sm text-gray-500 line-clamp-2'>{parse(content)}</h4>
          </div>
        </div>
    </Link>
  )
}

export default Postcard;