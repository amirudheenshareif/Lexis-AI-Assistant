import { Router } from "express";
import multer from "multer";
import { parsePdf } from "../services/pdfParsing.js";
import fs from "fs/promises";
import { splitText } from "../services/splitText.js";
import { checkCollections } from "../config/qdrant.js"; 
import { storeEmbeddings } from "../services/storeEmbeddings.js";
import { generateEmbeddings } from "../services/generateEmbeddings.js";
import { batchChunkArray } from "../services/batchChunkArray.js";


const router = Router();
const uploads = multer({ dest: "uploads/" });


router.post("/", uploads.array("files",10),  async (req, res)=> {
    // console.log("Received files:", req.files); // req.files is multer convention

    // Extract text from each PDF file
    let combinedTextFromPdf = "";
    for (const file of req.files){
         console.log(file.path)
         const textFromPdf = await parsePdf(file.path);
         combinedTextFromPdf += textFromPdf;
         await fs.unlink(file.path);
    }

    // Split the combined text into chunks
    const chunks = await splitText(combinedTextFromPdf);

    //Generate Embeddings for each chunks
     const chunkArray = chunks.map((chunk) => chunk.pageContent);
     const collectionStatus = await checkCollections();
     let allTexts = [];
     let allEmbeddings= [];
     let batches= [];

    if(chunkArray.length > 96){

        batches = batchChunkArray(chunkArray);
        for(const batch of batches){
            const batchEmbedding = await generateEmbeddings(batch);
            allTexts.push(...batchEmbedding.texts);
            allEmbeddings.push(...batchEmbedding.embeddings)
        }
    }else{
           const embedding = await generateEmbeddings(chunkArray);
           allTexts = [...embedding.texts];
           allEmbeddings = [...embedding.embeddings]
       }

     const embeddingStorageStatus = await storeEmbeddings(allTexts,allEmbeddings)
    




    res.send({
        message: "embedding stored successfully",
        batches:batches.length,
        allTexts:allTexts.length,
        allEmbeddings: allEmbeddings.length,
        embeddingStorageStatus: embeddingStorageStatus,

    });
   
})
export default router;



 // Receive

    //extractText

    // splitText

    //chunks

    //generateEmbedddings