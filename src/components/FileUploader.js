import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'; // Usamos um arquivo CSS separado para estilos

// Componente FileUploader com prop-types para validação de tipos
const FileUploader = ({ onFileChange }) => {

  return (
    <div className="upload-container">
      <input
        className="upload-input"
        type="file"
        accept=".docx"
        onChange={onFileChange}
        aria-label="Upload your .docx file" // Label para acessibilidade
      />
    </div>
  );
};

// Definindo os tipos de props esperados para o componente
FileUploader.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default FileUploader;
