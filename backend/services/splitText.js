import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";

export const splitText = async (textFromFile) => {

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });
    try{
        const chunks = await splitter.createDocuments([textFromFile]);
        console.log("Chunks:", chunks);
        return chunks;
    }
    catch (error) {
        console.error("Error splitting text:", error);    
    }
}