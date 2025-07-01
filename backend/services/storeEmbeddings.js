import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const storeEmbeddings = async (allTexts,allEmbeddings)=> {
   

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.QDRANT_API_KEY}`
    }
    

    const points = allEmbeddings.map((vector,index)=> ({
        id: Date.now() + index, // Unique ID for each point
        vector: vector,
        payload: {
            text: allTexts[index],
        }
    }))

    // console.log("Prepared points:", points.slice(0, 1)); // just to avoid flooding
    // console.log("Vector length:", points[0]?.vector?.length);

    try{
        const response= await axios.put(`${process.env.QDRANT_URL}/collections/${process.env.COLLECTION}/points`, {
            points: points
        }, { headers });
        return response.data;
    }
    catch(error){
        console.error("Error storing embeddings:", error);
        return {msg: "error storing embeddings"}
    }


}