import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import FileUploader from './components/FileUploader';
import NameListInput from './components/NameListInput';
import GenerateButton from './components/GenerateButton';
import Footer from './components/Footer';
import { readFileContent } from './utils/fileUtils';
import { generateDocuments } from './services/documentService';
import TagListInput from './components/TagListInput';
import './components/styles.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [names, setNames] = useState('');
  const [tagList, setTagList] = useState(JSON.parse(localStorage.getItem('tagList')) || [{ tag: '', text: '' }]);
  const [templateContent, setTemplateContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o indicador de carregamento

  useEffect(() => {
    window.Buffer = Buffer;
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setErrorMessage('');

    try {
      const content = await readFileContent(selectedFile);
      setTemplateContent(content);
    } catch (error) {
      setErrorMessage('Erro ao ler o arquivo: ' + error.message);
      console.error('Erro ao ler o arquivo:', error);
    }
  };

  const handleGenerateDocuments = async () => {
    if (!templateContent) {
      alert('Por favor, carregue um documento de template primeiro.');
      return;
    }

    const namesArray = names.split('\n').filter(name => name.trim() !== '');
    if (namesArray.length === 0) {
      alert('Por favor, insira pelo menos um nome.');
      return;
    }

    setIsLoading(true); // Inicia o indicador de carregamento
    setErrorMessage('');

    try {
      await generateDocuments(templateContent, namesArray, tagList);
    } catch (error) {
      setErrorMessage('Erro ao gerar o documento: ' + error.message);
      alert('Erro ao gerar o documento. Verifique o console para mais detalhes.');
      console.error('Erro ao gerar o documento:', error);
    } finally {
      setIsLoading(false); // Finaliza o indicador de carregamento
    }
  };

  const handleAddTag = ({ tag, text }) => {
    if (tag === '' || text === '') {
      alert('Por favor, preencha os campos "Tag" e "Texto a ser usado"');
      return;
    }

    if (tag === "name") {
      alert('Tag reservada');
      return;
    }

    setTagList([...tagList, { tag, text }]);
  };

  const handleRemoveTag = ({ tag, text }) => {
    const updatedTagList = tagList.filter(t => !(t.tag === tag && t.text === text));
    setTagList(updatedTagList);
  };

  const handleSave = () => {
    localStorage.setItem('tagList', JSON.stringify(tagList));
  };

  const handleExport = () => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(tagList)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'tagList.json';
    a.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          setTagList(JSON.parse(content));
        } catch (error) {
          setErrorMessage('Erro ao importar a lista de tags: ' + error.message);
          console.error('Erro ao importar a lista de tags:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="container">
      <h1>Docx Preecher</h1>
      <FileUploader onFileChange={handleFileChange} />
      <NameListInput names={names} setNames={setNames} />
      <TagListInput handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} tagList={tagList} />
      <GenerateButton onClick={handleGenerateDocuments} />
      <div className="save">
        <button className="button-save" onClick={handleSave}>Salvar Localmente</button>
        <button className="button-export" onClick={handleExport}>Exportar</button>
      </div>
      <button className="button-import" onClick={handleImport}>Importar</button>
      {isLoading && <p className="loading-message">Gerando documentos...</p>} {/* Exibe o indicador de carregamento */}
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro se existir */}
      <Footer />
    </div>
  );
};

export default App;