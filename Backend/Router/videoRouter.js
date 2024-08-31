import express from 'express';
import { videoController } from '../Controllers/videoController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // Correct import for URL conversion

const router = express.Router();

const __filename = fileURLToPath(import.meta.url); // Convert URL to file path
const __dirname = path.dirname(__filename); // Get the directory name from file path


console.log('__dirname' ,__dirname);



const storage =multer.memoryStorage()
const uploads = multer({ storage: storage });

router.post('/video', uploads.single('video'), videoController);

export default router;
