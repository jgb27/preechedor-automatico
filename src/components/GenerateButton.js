import React from 'react';
import styles from './styles';

const GenerateButton = ({ onClick }) => {
  return <button style={styles.button} onClick={onClick}>Modificar Documento</button>;
};

export default GenerateButton;