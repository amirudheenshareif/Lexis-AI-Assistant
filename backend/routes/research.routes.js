import { Router } from "express";
import { generateEmbeddings } from "../services/generateEmbeddings.js";
import { similarSearch } from "../services/similarSearch.js";
import { callLLM } from "../services/callLLM.js";
const router = Router();

router.post("/", async (req, res) => {
    const { userMsg } = req.body;
    const userQuery = userMsg.content;
    console.log("User Message:", userMsg);
    

    const embeddingUserMsg = await generateEmbeddings([userQuery])
    const vector = embeddingUserMsg.embeddings;
    const similarDocsObj = await similarSearch(vector[0]);

    const docContext = similarDocsObj.result.map((doc)=> doc.payload.text).join("\n");

    const botResponse = await callLLM(docContext, userQuery);

    res.send({
        forQuery:userQuery,
        role: "bot",
        botResponse: botResponse,
    })

    

    //split userMsg into chunks

    //generate embeddings for each chunk

    //find similar chunks in the database

    // pass it to llm as docContext
})
export default router;