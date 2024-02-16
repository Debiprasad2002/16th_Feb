// FileDelete.js

import React from 'react';
import axios from 'axios';

const FileDelete = ({ filepath, onFileDeleted }) => {
  const deleteFile = () => {
    axios.post('/delete', { filepath })
      .then(res => {
        onFileDeleted(filepath); // Notify parent component that file has been deleted
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <button onClick={deleteFile}>Delete File</button>
  );
};

export default FileDelete;
