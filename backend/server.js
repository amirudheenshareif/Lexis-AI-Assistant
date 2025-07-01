import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documents.routes.js";
import testRoutes from "./routes/test.route.js";
import researchRoutes from "./routes/research.routes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.text());
app.use(cors());
app.use("/documents", documentRoutes);
app.use("/test", testRoutes);
app.use("/research", researchRoutes);
// app.use("/research", researchRoutes);


app.listen(3000, ()=>{
    console.log("Server Running on Port 3000");
})