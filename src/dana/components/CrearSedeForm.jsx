import { Field, Form, Formik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

export const CrearSedeForm = ({dialogNuevaSedeForm, setDialogNuevaSedeForm}) => {

  const [nombreSede, setNombreSede] = useState('NUEVA SEDE')

  const initialValues = {
    nombresede: '',
    direccion: '',
    encargado: '',
    telefono: '',
    correo: ''
};

const onSubmit = (values, { resetForm }) => {
  values.nombresede = values.nombresede.toUpperCase();
    console.log(values);

    resetForm();
    setDialogNuevaSedeForm(false);    
}

  return (
    <Dialog header='DAR DE ALTA NUEVA SEDE' visible={dialogNuevaSedeForm} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => setDialogNuevaSedeForm(false)} className='mx-4 xl:mx-20 my-4 px-4 mt-16 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form>  
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className='grid place-items-center'>
                        <div 
                            className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl"
                        >
                            <div className="px-6 py-2 bg-[#E2E2E2]">
                              <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">{nombreSede}</div>
                            </div>
                            <div className="grid place-items-center" style={{ height: '100px' }}>
                              <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="nombresede"
                                    value={values.nombresede.toUpperCase()}
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
                    </div>
                </div> 
                <div className="pt-4 flex justify-end">
                  <button
                    type='submit'
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  >
                    Guardar
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