import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import FileUploader from './components/FileUploader';
import NameListInput from './components/NameListInput';
import GenerateButton from './components/GenerateButton';
import Footer from './components/Footer';
import { readFileContent } from './utils/fileUtils';
import { generateDocuments } from './services/documentService';
import TagListInput from './components/TagListInput';

const App = () => {
  const [file, setFile] = useState(null);
  const [names, setNames] = useState('');
  const [tagList, setTagList] = useState(JSON.parse(localStorage.getItem('tagList')) || [
    { tag: '', text: '' },
  ]);
  const [templateContent, setTemplateContent] = useState(null);

  useEffect(() => {
    window.Buffer = Buffer;

  }, []);

  const handleFileChange = async (e) => {

    setFile(e.target.files[0]);

    try {
      const content = await readFileContent(e.target.files[0]);
      setTemplateContent(content);
    } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
    }
  };

  const handleGenerateDocuments = () => {
    if (!templateContent) {
      alert('Por favor, carregue um documento de template primeiro.');
      return;
    }

    const namesArray = names.split('\n').filter(name => name.trim() !== '');

    try {
      generateDocuments(
        templateContent,
        namesArray,
        tagList,
      );
    } catch (error) {
      alert('Erro ao gerar o documento. Verifique o console para mais detalhes.');
    }
  };

  const handleAddTag = ({ tag, text }) => {
    if (tag === '' || text === '') {
      alert('Por favor, preencha os campos "Tag" e "Texto a ser usado"');
      return;
    }

    if (tag == "name") {
      alert('Tag reservada');
      return
    }

    setTagList(
      [...tagList, { tag, text }]
    );
    console.log('tagList:', tagList);
  }

  const handleRemoveTag = ({ tag, text }) => {
    tagList.splice(tagList.indexOf({ tag, text }), 1);
    setTagList(
      [...tagList]
    );
  }

  const handleSave = () => {
    localStorage.setItem('tagList', JSON.stringify(tagList));
  }

  const handleExport = () => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(tagList)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'tagList.json';
    a.click();
  }

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setTagList(JSON.parse(content));
      };
      reader.readAsText(file);
    };
    input.click();
  }

  return (
    <div style={styles.container} >
      <h1>Docx Preecher</h1>
      <FileUploader onFileChange={handleFileChange} />
      <NameListInput names={names} setNames={setNames} />
      <TagListInput handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} tagList={tagList} />
      <GenerateButton onClick={handleGenerateDocuments} />
      <div style={styles.save} >
        <button style={styles.buttonSave} onClick={() => handleSave()}>Salvar Localmente</button>
        <button style={styles.buttonExport} onClick={() => handleExport()}>Export</button>
      </div>
        <button style={styles.buttonImport} onClick={() => handleImport()}>Importar</button>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    alignItems: 'center',
  },
  save: {
    display: 'flex',
    gap: '10px',
  },
  buttonSave: {
    padding: '10px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonExport: {
    padding: '10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonImport: {
    padding: '10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}

export default App;