// backend/routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// File upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      filepath: req.file.path
    });
    await newFile.save();
    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// File delete route
router.post('/delete', async (req, res) => {
  const filepath = req.body.filepath;
  try {
    const file = await File.findOneAndDelete({ filepath });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    // Delete the file from the filesystem
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting file' });
      }
      res.json({ message: 'File deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting file' });
  }
});

module.exports = router;
