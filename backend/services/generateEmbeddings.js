import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

export const generateEmbeddings = async (chunkArray) =>{
    const response = await cohere.embed({
        texts: chunkArray, // convention as it expects array of strings
        model: "embed-english-v2.0",
    });
    
    return {texts:chunkArray,embeddings:response.embeddings};
}