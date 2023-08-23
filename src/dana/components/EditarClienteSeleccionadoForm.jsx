import { Field, Form, Formik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { api } from '../helpers/variablesGlobales'
import useAuth from '../hooks/useAuth'
import { Dropdown } from 'primereact/dropdown'

const opcionesStatus = [
  { label: 'ACTIVO', value: 'ACTIVO' },
  { label: 'INACTIVO', value: 'INACTIVO' }
];

export const EditarClienteSeleccionadoForm = ({clienteState, dialogEditatarClienteForm, setDialogEditatarClienteForm, setVentanaCarga, setVentanaConfirmacion, setUploadedImage, uploadedImage, setFile, file, setRespuestaApiCliente}) => {

  const { userAuth: usuarioLogiado} = useAuth();

    console.log(clienteState);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFile(acceptedFiles[0])
        setUploadedImage(URL.createObjectURL(file));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 });

      const onSubmit = (values, { resetForm }) => {
        setVentanaCarga(true);
  
        console.log(values);
        values.cliente = values.cliente.toUpperCase();
        values.clienteAplicacion = usuarioLogiado[0].clienteAplicacion;
        //clienteAplicacion: usuarioLogiado.clienteAplicacion,
      
        // Pasar una función de callback que maneje la creación de nuevoCliente
        convertirUrlaBytes(file, (arregloImagen) => {
          //const values2 = {clienteAplicacion: usuarioLogiado[0].clienteAplicacion, ...values}
          const nuevoCliente = {
            cliente: values,
            imagen: arregloImagen,
          };
          // console.log(usuarioLogiado[0].clienteAplicacion);
          // console.log(nuevoCliente);
          
          fetch(`${api}/nuevo/cliente`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoCliente),
          })
            .then((response) => response.text())
            .then((responseData) => {
                setVentanaCarga(false);
                setVentanaConfirmacion(true);
                setDialogEditatarClienteForm(false);
                setRespuestaApiCliente(responseData);
                console.log(responseData);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      };

      const convertirUrlaBytes = (data, onSubmitCallback) => {
        const reader = new FileReader();
      
        reader.onload = () => {
          const arrayBuffer = reader.result;
          const byteArray = new Uint8Array(arrayBuffer);
          const arreglo = Array.from(byteArray);
          console.log(arreglo);
      
          // Llamar al callback onSubmit con el arreglo de imagen como argumento
          onSubmitCallback(arreglo);
        };
      
        reader.readAsArrayBuffer(data);
      };

  return (
    <Dialog header='' visible={dialogEditatarClienteForm} baseZIndex={-1} style={{ width: '70vw', height: '36vw' }} onHide={() => setDialogEditatarClienteForm(false)} className='mx-4 xl:mx-20 my-4 px-4 mt-20 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <Formik initialValues={clienteState} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form>   
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className='grid place-items-center'>
                        <div 
                            className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl"
                        >
                            <div className="px-6 py-2 bg-[#E2E2E2]">
                              <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">{clienteState.cliente}</div>
                            </div>
                            <div className="grid place-items-center">
                                {uploadedImage && <img src={clienteState.urllog? clienteState.urllog : uploadedImage} alt="Imagen Cargada"/>} 
                                {/* <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i> */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="cliente"
                                    value={values.cliente.toUpperCase()}
                                    // onChange={(e) => {
                                    //     handleChange(e);
                                    //     setNombreCliente(e.target.value.toUpperCase());
                                    //   }}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Nombre
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="direccion"
                                    value={values.direccion}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Dirección
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="telefono"
                                    value={values.telefono}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Teléfono
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="estatus"
                                    value={values.estatus}
                                    options={opcionesStatus} 
                                    optionLabel="value"
                                    // onChange={(e) => {
                                    //   handleChange(e);
                                    //   setNombreSede(e.target.value.toUpperCase());
                                    // }}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Estatus
                                </label>
                            </span>
                        </div>
                        {/* <Toast ref={toast}></Toast> */}
                        {/* <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} /> */}
                        <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
                          <input {...getInputProps()} />
                          <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una.</p>
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
                    <button
                        type="submit"
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    >
                        Guardar
                    </button>
                    <button
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => {
                          setDialogEditatarClienteForm(false);
                        }}
                        type='button'
                    >
                        Cancelar
                    </button>
                </div>
            </Form>
        )}
        </Formik>
    </Dialog> 
  )
}
