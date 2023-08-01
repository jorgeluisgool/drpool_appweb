import { FileUpload } from 'primereact/fileupload';
import React, { useState } from 'react';

export const EjemploMultiFile = () => {
  const [files, setFiles] = useState([]);

  const onFileUpload = (event) => {
    console.log(event.files);
    setFiles(event.files);
  };

  const filetemplate = (file, props) => {
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

  return (
    <>
      <div>
        <FileUpload
          name="files"
          //url="http://192.168.0.191:8080/upload" // URL del endpoint del servidor Spring Boot para cargar archivos
          multiple
          accept="image/*"
          //maxFileSize={1000000} // Tamaño máximo del archivo en bytes (1MB en este caso)
          emptyTemplate="Arrastra y suelta archivos aquí o selecciona uno"
          fileTemplate={filetemplate}
          chooseLabel="subir"
          uploadLabel="Cargar"
          cancelLabel="Cancelar"
          className="p-mt-4"
          auto={true}
          customUpload={true}
          onUpload={onFileUpload} // Cambio aquí, utilizamos onUpload en lugar de uploadHandler
        />
        {/* {files.length > 0 && (
          <div className="p-mt-2">
            <h4>Archivos Cargados:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </>
  );
};
