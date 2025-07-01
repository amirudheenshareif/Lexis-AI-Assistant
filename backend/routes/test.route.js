import { Router } from "express";
// import { CohereClient } from "cohere-ai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


// const cohere = new CohereClient({
//   token: process.env.CO_API_KEY,
// });


const router = Router();

router.post("/", async (req,res) =>{
    // const chunk = req.body;
    // const response = await cohere.embed({
    //     texts: [chunk],
    //     model: "embed-english-v2.0",
    // });
     const { docContext, userMsg } = req.body;

     const userQuery = userMsg.content;
     const docContext2 = docContext.content;

    const prompt = `Context: ${docContext2} User Query: ${userQuery}`
    let response;

                    try{
                        response = await axios.post(`${process.env.LLM_URL}`, {
                        model: process.env.LLM_MODEL,
                        messages: [
                            {
                                role: "system",
                                content: `You are a legal assistant. 
                                You will be provided with some context from legal documents and a user query 
                                Your task is to provide a concise and accurate response based on the context provided.
                                Make it conversational and easy to understand.`
                            },
                            {
                                role: "user",
                                content: prompt
                            }
                        ],
                        max_tokens: 300,
                        temperature: 0.7,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env. OPEN_ROUTER_KEY}`
                        }
                    });
                    }
                    catch (error) {
                        console.error("Error calling LLM:", error);
                    }
    
     res.send({
        message:"llm worked successfully",
        response: response.data.choices[0].message.content,
     })
});

export default router;