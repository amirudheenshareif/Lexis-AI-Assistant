import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// it is used to check if the collection exists in Qdrant, if not it creates a new collection with the specified vector size and distance metric.
export const checkCollections = async ()=> {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.QDRANT_API_KEY}`
    }
    console.log("QDRANT_URL:", process.env.QDRANT_URL); 

    try{
        await axios.get(`${process.env.QDRANT_URL}/collections/${process.env.COLLECTION}`,{headers})
        return {msg: "collection exists"}
    }
    catch(error){
        await axios.put(`${process.env.QDRANT_URL}/collections/${process.env.COLLECTION}`,{
            "vectors": {
                "size": 4096,
                "distance": "Cosine"
            }
        },{headers})
        return {msg: "collection created"}

    }
} 