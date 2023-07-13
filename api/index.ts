import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
const app = express();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: (_req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//const __dirname = path.dirname(__filename);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const upload = multer({ storage });

// Upload entry
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(500).json({ message: 'No file' });
    }
    if (!fs.existsSync(path.join(__dirname, '..' ,'public', 'uploads'))) {
        fs.mkdirSync(path.join(__dirname,'..', 'public' , 'uploads'));
    }
    // Return file path
    //const filePath = path.join(__dirname, 'public', 'uploads', file.filename);
    const filePath = `${req.protocol}://${req.get('host')}/${file.filename}`;
    return res.status(200).json({ filePath: filePath })
});

app.get('/api', (_req, res) => {
    res.send('Hello World!');
});


app.use(express.static(path.join(__dirname, '..' ,'public', 'uploads')));

app.listen(3000, () => console.log('App listening on port 3000!'));