// backend/models/File.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  filepath: String
});

module.exports = mongoose.model('File', fileSchema);
