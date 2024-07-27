import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

/**
 * Função para gerar documentos personalizados
 * @param {ArrayBuffer} templateContent - Conteúdo do template em formato ArrayBuffer
 * @param {Array} namesArray - Array de nomes para personalizar os documentos
 * @param {Array} tagList - Lista de tags e textos para substituir no template
 */
export const generateDocuments = (templateContent, namesArray, tagList) => {
  namesArray.forEach(name => {
    try {
      const zip = new PizZip(templateContent);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const data = createDataObject(name, tagList);

      doc.setData(data);

      try {
        doc.render();
      } catch (error) {
        console.error('Error rendering document:', error);
        throw new Error('Error rendering document: ' + error.message);
      }

      const out = generateDocumentBlob(doc);

      const { firstName, lastName } = getFirstAndLastName(name);

      saveAs(out, `Convite-${firstName}-${lastName}.docx`);
    } catch (error) {
      console.error('Error processing template:', error);
      throw new Error('Error processing template: ' + error.message);
    }
  });
};

/**
 * Cria um objeto de dados para o documento
 * @param {string} name - Nome a ser inserido no documento
 * @param {Array} tagList - Lista de tags e textos para substituir no template
 * @returns {Object} - Objeto de dados para o documento
 */
const createDataObject = (name, tagList) => {
  const data = { name };
  tagList.forEach(tag => {
    data[tag.tag] = tag.text;
  });
  return data;
};

/**
 * Gera o Blob do documento
 * @param {Object} doc - Documento Docxtemplater
 * @returns {Blob} - Blob do documento gerado
 */
const generateDocumentBlob = (doc) => {
  return doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
};

/**
 * Extrai o primeiro e último nome de uma string de nome completo
 * @param {string} name - Nome completo
 * @returns {Object} - Objeto contendo o primeiro e último nome
 */
const getFirstAndLastName = (name) => {
  const [firstName] = name.split(' ');
  const lastName = name.split(' ').slice(-1)[0];
  return { firstName, lastName };
};