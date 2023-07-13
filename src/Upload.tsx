import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (cb: any) => {
    cb(null, 'uploads/');
  },
  filename: (file: any, cb:any) => {
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  },
});

const upload = multer({ storage });

const app = express.Router();

app.post('/upload', upload.single('file'), (req , res) => {
  // Get the uploaded file
  console.log("uploading file...")
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    return res.status(400).json({ message: error.message });
  }
  // Generate the URL of the uploaded file
  const fileUrl = `${req.protocol}://${req.get('host')}/${file.filename}`;
  // set no cors
  res.set('Access-Control-Allow-Origin', '*');
  // Return the URL of the uploaded file
  res.json({ fileUrl });
});

app.use(express.static(path.join(__dirname, 'uploads')));


