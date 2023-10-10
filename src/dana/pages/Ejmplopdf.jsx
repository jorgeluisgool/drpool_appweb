import React, { useState } from 'react'
import { PDFDocument, rgb } from 'pdf-lib';

export const Ejmplopdf = () => {

    const [pdfParts, setPdfParts] = useState([]);
  const [mergedPDF, setMergedPDF] = useState(null);

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const pdfPart = {
        name: file.name,
        data: event.target.result,
      };
      setPdfParts((prevPdfParts) => [...prevPdfParts, pdfPart]);
    };

    reader.readAsArrayBuffer(file);
  };

  const mergePDFTables = async () => {
    try {
      // Crea un nuevo documento PDF en blanco
      const mergedDoc = await PDFDocument.create();

      // Itera a través de las partes de PDF
      for (const pdfPart of pdfParts) {
        // Abre el PDF de la parte
        const pdfBytes = pdfPart.data;
        const pdf = await PDFDocument.load(pdfBytes);

        // Copia las páginas que deseas fusionar (por ejemplo, las primeras dos páginas)
        const [page1] = await mergedDoc.copyPages(pdf, [0]);
        const [page2] = await mergedDoc.copyPages(pdf, [1]);

        // Añade las páginas al documento fusionado
        mergedDoc.addPage(page1);
        mergedDoc.addPage(page2);
      }

      // Guarda el PDF fusionado como un Blob
      const mergedBlob = await mergedDoc.save();

      // Actualiza el estado con el PDF fusionado
      setMergedPDF(mergedBlob);
    } catch (error) {
      console.error('Error al fusionar PDFs:', error);
    }
  };

  return (
    <div>
      <h1>Fusionar PDFs con Tablas</h1>
      <input type="file" accept=".pdf" onChange={handlePDFUpload} />
      <button onClick={mergePDFTables}>Fusionar PDFs</button>

      {mergedPDF && (
        <div>
          <h2>PDF Fusionado</h2>
          <a
            href={URL.createObjectURL(mergedPDF)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver PDF Fusionado
          </a>
        </div>
      )}
    </div>
  )
}
