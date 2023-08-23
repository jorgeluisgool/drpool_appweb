import { Field, Form, Formik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { api } from '../helpers/variablesGlobales'
import { Dropdown } from 'primereact/dropdown'

const opcionesStatus = [
  { label: 'ACTIVO', value: 'ACTIVO' },
  { label: 'INACTIVO', value: 'INACTIVO' }
];

export const CrearSedeForm = ({dialogNuevaSedeForm, setDialogNuevaSedeForm, setVentanaCarga, setModalRegistroGuardado, setSedeSeleccionada, sedeSeleccionada, clientes}) => {

  const [nombreSede, setNombreSede] = useState('NUEVA SEDE')

  const initialValues = {
    nombre: '',
    direccion: '',
    encargado: '',
    telefono: '',
    correo: '',
    estatus: '',
    cliente: {

    }
};


  const onSubmit = (values, { resetForm }) => {
      console.log(values);

     setVentanaCarga(true);
    //  values.cliente = values.nombre.toUpperCase();
  
       fetch(`${api}/nueva/sede`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
       })
         .then((response) => response.text())
         .then((responseData) => {
           setVentanaCarga(false);
           setModalRegistroGuardado(true);
           setDialogNuevaSedeForm(false);
         })
         .catch((error) => {
           console.log(error);
         });
  };

  return (
    <Dialog header='' visible={dialogNuevaSedeForm} baseZIndex={-1} style={{ width: '70vw', height: '35vw' }} onHide={() => setDialogNuevaSedeForm(false)} className='mx-4 xl:mx-20 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <Formik initialValues={sedeSeleccionada === undefined?  initialValues : sedeSeleccionada} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form>  
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {/* <div className='grid place-items-center'> */}
                      <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="nombre"
                                    value={values.nombre.toUpperCase()}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setNombreSede(e.target.value.toUpperCase());
                                    }}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Nombre de la sede
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="encargado"
                                    value={values.encargado}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Encargado de la sede
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
                                    as={InputText}
                                    name="correo"
                                    value={values.correo}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  e-mail
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
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Estatus
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="cliente"
                                    value={values.cliente}
                                    options={clientes.filter(cliente => cliente.estatus === "ACTIVO")} 
                                    optionLabel="cliente"
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Cliente a la que pertenece
                                </label>
                            </span>
                        </div>
                    </div>
                {/* </div>  */}
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
                          setDialogNuevaSedeForm(false);
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


// ENCARGADO SEDE
// DATOS DE CONTACTO