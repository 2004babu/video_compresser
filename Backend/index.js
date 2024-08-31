import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import compression from "compression";
import dotenv from "dotenv";

import videoRouter from './Router/videoRouter.js'
import cookieParser from "cookie-parser";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

dotenv.config()

const app = express();
const PORT = process.env.PORT || 9000;
app.use(cookieParser());
app.use(express.json());

app.use(compression())
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.static(path.join(__dirname,'../Frontend/dist')))

app.use('/api',videoRouter)

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../Frontend/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
