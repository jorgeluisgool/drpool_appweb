import { Field, Form, Formik } from 'formik'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const initialValues = {
    "fecha": "",
    "firsdate": "",
    "lastdate": "",
    "sede": "",
    "alcaldia": "",
    "alberca": "",
    "tipoalberca": "",
    "caracteristica": "",
    "realizo": "",
    "reviso": "",
    "REPORT_LIST_IMAGES":[
        [{
            "ACTIVITY": "Retiro de sólidos flotantes y sedimentados"
        },
        {   
        "IMAGES": ["https://i0.wp.com/a0.muscache.com/im/pictures/miso/Hosting-52985510/original/1df75da2-c198-4f53-b7a9-4c848a3a4c39.jpeg", "https://i0.wp.com/a0.muscache.com/im/pictures/miso/Hosting-52985510/original/1df75da2-c198-4f53-b7a9-4c848a3a4c39.jpeg", "https://i0.wp.com/a0.muscache.com/im/pictures/miso/Hosting-52985510/original/1df75da2-c198-4f53-b7a9-4c848a3a4c39.jpeg"]
        },
        {
        "TEXT_IMAGES":"En piscinas que no tienen rejilla de rebosamiento, y que por tanto no pueden ser completamente llenas con agua, siempre se forma una línea perimetral oscura sobre el azulejo, como resultado de todos los contaminantes insolubles que flotan en el agua (grasa corporal, productos para el cabello, cremas, maquillaje, protector solar, entre otros). Para eliminar esta suciedad se recomienda tallar la cenefa con alguna fibra que sea capaz de eliminar la mugre y de esta manera la estética y salud del vaso de la alberca se mantenga."
        }],
        [
        {
            "ACTIVITY": "Cepillado de paredes y fondo"
        },
        {   
        "IMAGES": ["https://i0.wp.com/a0.muscache.com/im/pictures/miso/Hosting-52985510/original/1df75da2-c198-4f53-b7a9-4c848a3a4c39.jpeg", "https://i0.wp.com/a0.muscache.com/im/pictures/miso/Hosting-52985510/original/1df75da2-c198-4f53-b7a9-4c848a3a4c39.jpeg", "https://i0.wp.com/a0.muscache.com/im/pictures/miso/Hosting-52985510/original/1df75da2-c198-4f53-b7a9-4c848a3a4c39.jpeg"]
        },
        {
        "TEXT_IMAGES":"En piscinas que no tienen rejilla de rebosamiento, y que por tanto no pueden ser completamente llenas con agua, siempre se forma una línea perimetral oscura sobre el azulejo, como resultado de todos los contaminantes insolubles que flotan en el agua (grasa corporal, productos para el cabello, cremas, maquillaje, protector solar, entre otros). Para eliminar esta suciedad se recomienda tallar la cenefa con alguna fibra que sea capaz de eliminar la mugre y de esta manera la estética y salud del vaso de la alberca se mantenga."
        }
        ]
    ]
}
export const ReporteMensualForm = () => {

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
    }

  return (
        <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <div className='mt-4 mb-8 p-4 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group'>
                    <h1 className='font-bold text-sm xl:text-2xl mb-2 text-[#245A95]'><ion-icon name="caret-forward-outline"></ion-icon>Bombeo</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="fecha"
                                        value={values.fecha}

                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Fecha  
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="firsdate"
                                        value={values.firsdate}

                                    />  
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        firsdate
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="lastdate"
                                        value={values.lastdate}

                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        lastdate
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="sede"
                                        value={values.sede}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Sede
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="alcaldia"
                                        value={values.alcaldia}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Alcaldia
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="alberca"
                                        value={values.alberca}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Alberca
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="tipoalberca"
                                        value={values.tipoalberca}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Tipo de Alberca
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="caracteristica"
                                        value={values.caracteristica}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Caracteristica de la Alberca
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={InputText}
                                        name="realizo"
                                        value={values.realizo}
                                        
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Realizo 
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={InputText}
                                        name="reviso"
                                        value={values.reviso}
                                        
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Reviso 
                                    </label>
                                </span>
                            </div>
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
                </Form>
            )}
        </Formik>
        </>
  )
}
