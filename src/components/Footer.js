import React from 'react';
import styles from './styles';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.paragraph}>
        Todos os direitos reservados &copy; JG Bispo 2021 - Gerador de Convites
        <span>
          Acesse o
          <a
            href="https://github.com/jgb27"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            repositório
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
