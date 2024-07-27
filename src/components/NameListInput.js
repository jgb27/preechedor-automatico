import React from 'react';
import styles from './styles';

const NameListInput = ({ names, setNames }) => {
  return (
    <textarea
      style={styles.textArea}
      rows="10"
      cols="50"
      placeholder="Digite os nomes, um por linha... Use a tag {name} para inserir o nome no documento."
      value={names}
      onChange={e => setNames(e.target.value)}
    />
  );
};

export default NameListInput;
