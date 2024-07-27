// DESC: Button component to generate a new document

import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'; // Importando o arquivo CSS

const GenerateButton = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Modificar Documento
    </button>
  );
};

// Definindo os tipos de props esperados para o componente
GenerateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GenerateButton;
