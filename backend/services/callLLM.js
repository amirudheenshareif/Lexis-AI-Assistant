import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

export const callLLM = async(docContext, userQuery)=>{

    const prompt = `Context: ${docContext} User Query: ${userQuery}`
    let response;

                    try{
                        response = await axios.post(`${process.env.LLM_URL}`, {
                        model: process.env.LLM_MODEL,
                        messages: [
                            {
                                role: "system",
                                content: ` You are a helpful and friendly AI legal assistant.
                                          - If user sends casual message, Reply briefly (Not more than 30 words) in a friendly way without legal content even if context is provided
                                          - Reply with legal content based on context only if user asks legal content
                                          - If the user asks a legal question and relevant context (like a document or case notes) is provided, answer the question using that context only. When referring to specific clauses, sections, or headings, use clear phrasing like "According to Clause X..." or "As per Section Y...".
                                          - If multiple cases are referenced, specify which case or item the information is from. Mention case names and years where available.
                                          - Prefer plain English and avoid long legalese unless the user asks for full quotes. If the user requests, you may simplify to layman-level".
                                          - If the context lacks enough information to answer confidently, say so clearly and suggest what additional input would help.
                                          - If too many matching cases or sections are found, ask the user for clarification (e.g., “Would you like a summary of all or a specific one?”).
                                          - If the user uploads a legal document, extract key metadata (like grouped issues, constitutional articles, or cited cases) and use that to improve responses.
                                          - Do not fabricate legal reasoning or cite content that's not present in the context provided.
                                          - If the user sends a casual or non-legal message (e.g., "hi", "hello", "how are you", "okay", etc.), respond briefly and conversationally, in **2 lines or fewer**. Do not include legal content or summaries unless the user asks.
                                          
                                          `
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

                    return response.data.choices[0].message.content;

                    
                    
}