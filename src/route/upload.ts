import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: (_req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    res.set('Access-Control-Allow-Origin', '*');
    if (!file) {
        return res.status(500).json({ message: 'No file' });
    }
    // Return file path
    //const filePath = path.join(__dirname, 'public', 'uploads', file.filename);
    const filePath = `${req.protocol}://${req.get('host')}/${file.filename}`;
    return res.status(200).json({ filePath: filePath })
});

export default router;