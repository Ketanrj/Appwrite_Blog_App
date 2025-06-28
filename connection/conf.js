const conf = {
    Endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    ProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    CollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    BucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

// console.log(conf.Endpoint);

export default conf;
