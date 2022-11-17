import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./openapi.json" assert { type: "json" };
import { v2 as cloudinary } from "cloudinary";
import fileUpload from 'express-fileupload';
import cors from 'cors';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(fileUpload());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.post("/api/uploadImage", async (req, res) => {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log("Uploaded files:", req.files);
  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  file = req.files.file;
  // @ts-ignore
  uploadPath = './temp/' + Math.random() + file.name;


  // Use the mv() method to place the file somewhere on your server
  // @ts-ignore
  file.mv(uploadPath, async function (err) {
    if (err)
      return res.status(500).send(err);
    try {
      // Upload the image
      // @ts-ignore
      const result = await cloudinary.uploader.upload(uploadPath, { folder: "grama-check" });
      res.json({
        status: "Success",
        message: "Image uploaded successfully",
        url: result.secure_url
      });
    } catch (error) {
      console.error(error);
      return res.json({ status: "Error" });
    }
  });
});

app.get("/", (_, res) => {
  return res.json({ status: "Address check api is running /api" });
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
});

app.use("*", (_, res) => {
  return res
    .status(404)
    .json({ error: "the requested resource does not exist on this server" });
});

export default app;
