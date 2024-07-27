import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export const generateDocuments = (templateContent, namesArray, tagList) => {
  namesArray.forEach(name => {
    const zip = new PizZip(templateContent);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const data = {
      name: name,
    };

    tagList.forEach(tag => {
      data[tag.tag] = tag.text;
    });

    doc.setData(data);

    console.log('doc:', doc);

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
