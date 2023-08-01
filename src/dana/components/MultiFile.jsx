import { FileUpload } from 'primereact/fileupload';
import React, { useState } from 'react'

export const MultiFile = () => {

    const [files, setFiles] = useState([]);

  const onFileUpload = (event) => {
    console.log(event.files);
    setFiles(event.files);
  };

  const filetemplatee = (file, props) => {
    console.log(file);
    return (
      <div className="p-fileupload-file">
        {file.name} - {file.size} bytes
        <span className="p-fileupload-delete" onClick={props.onRemove}>
          <i className="pi pi-times" />
        </span>
      </div>
    );
  };

const  uploadJSONFiles =(event) => {
    console.log(event)
    let formData = new FormData(); 
    let jsonBodyData = { 'someKey': 'someValue' };
    formData.append('files', event.files[0]);
    formData.append('files', event.files[1]);
    formData.append('jsonBodyData',
      new Blob([JSON.stringify(jsonBodyData)], { 
        type: 'application/json'
      }));
    fetch('http://192.168.0.191:8080/upload', {  
      method: 'POST',
      body: formData
    }).then(response => response.json())
    .then(result => console.log('Files successfully uploaded!'))
    .catch(error => console.log('error occurred!', error)); 
  }

  return (
    <div>
        <FileUpload
          name="files[]"
          multiple
          //url="http://192.168.0.191:8080/upload" // URL del endpoint del servidor Spring Boot para cargar archivos
          mode='basic'
          accept="image/*"
          maxFileSize={1000000} // Tamaño máximo del archivo en bytes (1MB en este caso)
          emptyTemplate="Arrastra y suelta archivos aquí o selecciona uno"
          fileTemplate={filetemplatee}
          //chooseLabel="subirrr"
          //uploadLabel="Cargar"
          //cancelLabel="Cancelar"
          className="p-mt-4"
          //auto={true}
          customUpload
          uploadHandler={uploadJSONFiles} // Cambio aquí, utilizamos onUpload en lugar de uploadHandler
        />
        {files.length > 0 && (
          <div className="p-mt-2">
            <h4>Archivos Cargados:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  )
}
