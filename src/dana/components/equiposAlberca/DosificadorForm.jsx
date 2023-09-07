import { Field, Form, Formik } from 'formik'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react'
import { api } from '../../helpers/variablesGlobales';

const opcionesEstatus = [
    { label: 'FUNCIONANDO', value: 'FUNCIONANDO' },
    { label: 'NO FUNCIONANDO', value: 'NO FUNCIONANDO' }
];

export const DosificadorForm = ({albercaSelected, setVentanaCarga, setModalRegistroGuardado}) => {

    const initialValues = {
        alberca: albercaSelected,
        numero: '',
        estatus: '',
        fecha_ultimo_mantenimiento: '',
        marcasolido: '',
        modelosolido: '',
        pastillasolido: '',
        marcaliquido: '',
        modeloliquido: '',
        flujoliquido: '',
        marcaclorador: '',
        modeloclorador: '',
        capacidadmaxclorador: '',
        voltajeclorador: '',
        observaciones: ''
    }

    const onSubmit = (values) => {
        console.log(values);

        setVentanaCarga(true);
       
            fetch(`${api}/nuevo/equipodosificador`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
              .then((response) => response.text())
              .then((responseData) => {
                    console.log(responseData);
                    setVentanaCarga(false);
                    setModalRegistroGuardado(true);
              })
              .catch((error) => {
                console.log(error);
              });
    }

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form>
                <div className='mt-4 p-4 bg-slate-50 shadow-md rounded-md border'>
                <h1 className='font-bold text-sm xl:text-2xl mb-2 text-[#245A95]'><ion-icon name="caret-forward-outline"></ion-icon>Dosificador</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="numero"
                                    value={values.numero}
                                    keyfilter="pint"
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Número
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="estatus"
                                    value={values.estatus}
                                    options={opcionesEstatus}
                                    optionLabel="label" 
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Estatus 
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Calendar}
                                    name="fecha_ultimo_mantenimiento"
                                    value={values.fecha_ultimo_mantenimiento}
                                    
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Fecha de último mantenimiento  
                                </label>
                            </span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Solido</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="marcasolido"
                                    value={values.marcasolido}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Marca
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="modelosolido"
                                    value={values.modelosolido}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Modelo
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="pastillasolido"
                                    value={values.pastillasolido}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Pastilla
                                </label>
                            </span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Liquido</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="marcaliquido"
                                    value={values.marcaliquido}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Marca
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="modeloliquido"
                                    value={values.modeloliquido}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Modelo
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="flujoliquido"
                                    value={values.flujoliquido}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Flujo Max
                                </label>
                            </span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Clorador Salino</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="marcaclorador"
                                    value={values.marcaclorador}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Marca
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="modeloclorador"
                                    value={values.modeloclorador}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Modelo
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="capacidadmaxclorador"
                                    value={values.capacidadmaxclorador}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Capacidad Max
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="voltajeclorador"
                                    value={values.voltajeclorador}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Voltaje
                                </label>
                            </span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5 col-span-4">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputTextarea}
                                    name="observaciones"
                                    value={values.observaciones}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Observaciones  
                                </label>
                            </span>
                        </div>
                    </div>
                    <div className="cursor-pointer inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
                        <button
                            type="submit"
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
    </>
  )
}
