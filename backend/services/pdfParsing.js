import { readFile } from 'fs/promises';
import pdf from "pdf-parse-debugging-disabled"; // Using a stable version of pdf-parse

export const parsePdf = async (filePath) => {
    console.log("here");
    console.log("Parsing PDF file:", filePath);
    
    try{
        const buffer = await readFile(filePath);
        console.log(buffer.length);
        const data = await pdf(buffer);
        return data.text;  
    }
    catch (error) {
        console.error("Error parsing PDF:", error);
    }
}