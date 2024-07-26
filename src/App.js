import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import FileUploader from './components/FileUploader';
import NameListInput from './components/NameListInput';
import DateInput from './components/DateInput';
import CityInput from './components/CityInput';
import GenerateButton from './components/GenerateButton';
import Footer from './components/Footer';
import { readFileContent } from './utils/fileUtils';
import { generateDocuments } from './services/documentService';

const App = () => {
  const [file, setFile] = useState(null);
  const [names, setNames] = useState('');
  const [date, setDate] = useState('');
  const [templateContent, setTemplateContent] = useState(null);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

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
        day,
        month,
        year,
        city,
        state
      );
    } catch (error) {
      alert('Erro ao gerar o documento. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div style={styles.container} >
      <h1>Gerador de Convites</h1>
      <FileUploader onFileChange={handleFileChange} />
      <NameListInput names={names} setNames={setNames} />

      <DateInput
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />


      <CityInput city={city} setCity={setCity} state={state} setState={setState} />
      <GenerateButton onClick={handleGenerateDocuments} />
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
}

export default App;