// Desc: Footer component

import React from 'react';
import './styles.css'; // Importando o arquivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <p className="paragraph">
        Todos os direitos reservados &copy; JG Bispo 2021 - Gerador de Convites
        <span>
          Acesse o
          <a
            href="https://github.com/jgb27"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            repositório
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
