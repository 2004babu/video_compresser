import express from "express";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";
import compression from "compression";
import dotenv from "dotenv";

import videoRouter from './Router/videoRouter.js'

// Set the path to the FFmpeg binary
// ffmpeg.setFfmpegPath("C:\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe");

// Get the __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

dotenv.config()

const app = express();
const PORT = process.env.PORT || 9000;


app.use(compression())
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.static(path.join(__dirname,'../Frontend/dist')))

app.use('/',videoRouter)

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../Frontend/dist/index.html'))
})


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
