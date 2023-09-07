import { Field, Form, Formik } from 'formik'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';

export const ClienteConfiguracionForm = () => {

    const [uploadedImage, setUploadedImage] = useState(null);
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFile(acceptedFiles[0])
        setUploadedImage(URL.createObjectURL(file));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 });

  return (
    <Formik 
    // initialValues={proyectoAlbercaSeleccionado === undefined? initialValues : proyectoAlbercaSeleccionado} 
    // onSubmit={handleSubmit}
    >
        {({ values, field, form }) => (
            <Form>
                <h1 className="text-2xl font-bold text-[#245A95] pb-4 pl-6">Editar información de la empresa</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  <div className="p-inputgroup mb-2 mt-4 px-6">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombreproyectoalberca"
                              // value={values.nombreproyectoalberca.toUpperCase()}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Nombre de la empresa
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-2 mt-4 px-6">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombreproyectoalberca"
                              // value={values.nombreproyectoalberca.toUpperCase()}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Teléfono de contacto
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-2 mt-4 px-6">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombreproyectoalberca"
                              // value={values.nombreproyectoalberca.toUpperCase()}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Correo electrónico de contacto
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-2 mt-4 px-6">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombreproyectoalberca"
                              // value={values.nombreproyectoalberca.toUpperCase()}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Domicilio de las oficinas
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-2 mt-4 px-6">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombreproyectoalberca"
                              // value={values.nombreproyectoalberca.toUpperCase()}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            RFC de la empresa
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-2 mt-4 px-6">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombreproyectoalberca"
                              // value={values.nombreproyectoalberca.toUpperCase()}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Giro comercial
                          </label>
                      </span>
                  </div>
                  <div className='mx-6 col-span-2' {...getRootProps()} style={{ border: '2px dashed gray', padding: '40px', textAlign: 'center'}}>
                      <input {...getInputProps()} />
                      <p>Arrastra y suelta la imagen aquí o haz clic para seleccionar una.</p>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
  )
}
