import React from 'react';

const LoadingIndicator = ({ isLoading }) => {
  return (
    isLoading && <p className="loading-message">Gerando documentos...</p>
  );
};

export default LoadingIndicator;