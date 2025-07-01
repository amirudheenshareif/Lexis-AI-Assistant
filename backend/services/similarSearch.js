import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const similarSearch = async (vector) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.QDRANT_API_KEY}`
    };
    const response = await axios.post(`${process.env.QDRANT_URL}/collections/${process.env.COLLECTION}/points/search`, {
        vector: vector,
        limit: 5,
        with_payload: true,
    }, { headers }); 
    return response.data;
}   