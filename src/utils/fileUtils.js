// Função para ler o conteúdo de um arquivo usando FileReader
export const readFileContent = (file) => {
  // Retorna uma Promise que será resolvida ou rejeitada com base no resultado da leitura do arquivo
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // Evento de sucesso na leitura do arquivo
    reader.onload = (event) => {
      resolve(event.target.result); // Resolve a Promise com o conteúdo do arquivo
    };
    
    // Evento de erro na leitura do arquivo
    reader.onerror = (error) => {
      reject(error); // Rejeita a Promise com o erro ocorrido
    };
    
    // Inicia a leitura do arquivo como uma string binária
    reader.readAsBinaryString(file);
  });
};
