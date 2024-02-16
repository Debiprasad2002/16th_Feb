// server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/file_upload_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema and model for storing file paths in MongoDB
const FileSchema = new mongoose.Schema({
  filename: String,
  filepath: String
});

const File = mongoose.model('File', FileSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const newFile = new File({
    filename: req.file.originalname,
    filepath: req.file.path
  });
  newFile.save()
    .then(() => res.json({ message: 'File uploaded successfully' }))
    .catch(err => console.log(err));
});

// Delete route
app.post('/delete', (req, res) => {
  const filepath = req.body.filepath;
  File.findOneAndDelete({ filepath })
    .then(() => {
      // Delete the file from the filesystem
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error(err);
          return res.json({ error: 'Error deleting file' });
        }
        res.json({ message: 'File deleted successfully' });
      });
    })
    .catch(err => console.log(err));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
