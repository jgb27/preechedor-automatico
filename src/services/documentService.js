import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export const generateDocuments = (templateContent, namesArray, day, month, year, city, state) => {
  namesArray.forEach(name => {
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData({
      nome: name,
      data: `${day} de ${month} de ${year}`,
      localizacao: `${city} - ${state}`,
    });

    try {
      doc.render();
    } catch (error) {
      console.error(error);
      throw error;
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    var fistName = name.split(' ')[0];
    var lastName = name.split(' ').slice(-1)[0];

    saveAs(out, `Convite-${fistName}-${lastName}.docx`);
  });
};
