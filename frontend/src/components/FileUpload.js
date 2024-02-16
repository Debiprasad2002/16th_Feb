// FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post('/upload', formData)
      .then(res => {
        setMessage(res.data.message);
        setFile(null); // Clear selected file after successful upload
      })
      .catch(err => {
        setMessage('Error uploading file.');
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <div className="file-upload">
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
        {message}
      </div>
    </div>
  );
};

export default FileUpload;
