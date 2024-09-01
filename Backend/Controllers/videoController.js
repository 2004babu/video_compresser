import Ffmpeg from "fluent-ffmpeg";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import tmp from "tmp";

const __filename = fileURLToPath(import.meta.url); // Convert URL to file path
const __dirname = path.dirname(__filename); // Get the directory name from file path

// console.log('__dirname' ,__dirname);
export const videoController = async (req, res, next) => {
  
  console.log(req.file);
  try {
    const safeFilename = req.file.originalname.replace(/[^\w.-]/gi, "");

    const temFilePath = tmp.tmpNameSync({
      postfix: path.extname(safeFilename),
    });

    fs.writeFileSync(temFilePath, req.file.buffer);
    const outputDir = path.join(__dirname, "../uploads");
    const outputFilePath = path.join(outputDir, `${safeFilename}`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(outputFilePath);
    console.log(temFilePath);

   Ffmpeg(temFilePath)
  .outputOption([
    "-crf", "23",
    "-c:v", "libx264",
    "-b:v", "1000k",
    "-preset", "slow",
    "-c:a", "aac",
    "-b:a", "192k"
  ])
      .on("end", () => {
        console.log("process end succefully");

        fs.unlinkSync(temFilePath);
        console.log(outputFilePath);
        const BASE_URL = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${safeFilename}`;
        if (!res.headersSent) {
          res.status(200).json({ reelsURL: outputFilePath, BASE_URL });

          try {
            setTimeout(async () => {
              if (outputFilePath) {
                await fs.unlinkSync(outputFilePath);
              }
            }, 1000 * 60 * 2);
          } catch (error) {
            console.log(error);
          }
        }
      })
      .on("error", (error) => {
        console.error("Error processing video: ", error.message);
        res
          .status(500)
          .json({ success: false, message: "Error processing video." });
        fs.unlinkSync(temFilePath);
      })
      .save(outputFilePath);
    console.log(outputFilePath);
  } catch (error) {
    console.log(error);
  }
};
