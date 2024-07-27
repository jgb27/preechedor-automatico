// Desc: Componente que renderiza um textarea para o usuário inserir os nomes

import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'; // Importando o arquivo CSS

const NameListInput = ({ names, setNames }) => {
  return (
    <textarea
      className="text-area"
      rows="10"
      cols="50"
      placeholder="Digite os nomes, um por linha... Use a tag {name} para inserir o nome no documento."
      value={names}
      onChange={e => setNames(e.target.value)}
    />
  );
};

// Definindo os tipos de props esperados para o componente
NameListInput.propTypes = {
  names: PropTypes.string.isRequired,
  setNames: PropTypes.func.isRequired,
};

export default NameListInput;