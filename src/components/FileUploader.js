import React from 'react';
import styles from './styles';

const FileUploader = ({ onFileChange }) => {
  return (
    <div style={styles.uploadContainer}>
      <input style={styles.uploadInput} type="file" accept=".docx" onChange={onFileChange} />
    </div>
  );
};

export default FileUploader;
