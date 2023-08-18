import { Field, Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from 'react'
import { api } from '../../helpers/variablesGlobales';

const initialValues = {
    nombreproyectoalberca: '',
    alberca: {

    },
    tiposervicio: '',
    instrumentosmedicion: '',
    estatus: ''
}

  const opcionesStatus = [
    { label: 'ACTIVO', value: 'ACTIVO' },
    { label: 'INACTIVO', value: 'INACTIVO' }
  ];

  const opcionesTipoServicio = [
    { label: 'LIMPIEZA', value: 'LIMPIEZA' },
    { label: 'INSTALACION', value: 'INSTALACION' },
    { label: 'CAMBIO DE MOTOBOMBA', value: 'CAMBIO DE MOTOBOMBA' }
  ];

  const opcionesInstrmentosMedicion = [
    { label: 'COLORIMETRO', value: 'COLORIMETRO' },
    { label: 'FOTÓMETRO', value: 'FOTOMETRO' },
    { label: 'TERMOMENTRO SUMERGIBLE', value: 'TERMOMENTRO SUMERGIBLE' },
    { label: 'TERMOMENTRO DIGITAL', value: 'TERMOMENTRO DIGITAL' },
    { label: 'TURBIDEZ (VISUAL)', value: 'TURBIDEZ (VISUAL)' },
    { label: 'TURBIDIMETRO', value: 'TURBIDIMETRO' },
  ];

export const FormProyectos = ({modalCrearEditarProyectos, setModalCrearEditarProyectos, proyectoAlbercaSeleccionado, setVentanaCarga, setModalRegistroGuardado}) => {

    const [albercas, setAlbercas] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${api}/obtener/albercas`);
            const jsonData = await response.json();
            setAlbercas(jsonData);
          } catch (error) {
            console.log('Error:', error);
          }
        };
        fetchData();
    }, []);


    const handleSubmit = (values) => {

        setVentanaCarga(true);

        fetch(`${api}/nuevo/proyectoalberca`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then((response) => response.text())
            .then((responseData) => {
               console.log(responseData);
               setModalCrearEditarProyectos(false);
               setVentanaCarga(false);
               setModalRegistroGuardado(true);
            })
            .catch((error) => {
              console.log(error);
            });
    }

  return (
    <Dialog header={`Proyectos`} visible={modalCrearEditarProyectos} baseZIndex={-1} style={{ width: '70vw', height: '35vw' }} onHide={() => setModalCrearEditarProyectos(false)}>
        <Formik initialValues={proyectoAlbercaSeleccionado === undefined? initialValues : proyectoAlbercaSeleccionado} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="nombreproyectoalberca"
                                    value={values.nombreproyectoalberca.toUpperCase()}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Nombre del proyecto
                                </label>
                            </span>
                        </div>              
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="alberca"
                                    value={values.alberca}
                                    options={albercas.filter(alberca => alberca.estatus === "ACTIVO")} 
                                    optionLabel="nombrealberca"
                                    filter
                                    
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Alberca
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="tiposervicio"
                                    value={values.tiposervicio}
                                    options={opcionesTipoServicio}
                                    optionLabel="value"
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Tipo de servicio
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent md:w-20rem"
                                    as={MultiSelect}
                                    name="instrumentosmedicion"
                                    value={values.instrumentosmedicion}
                                    // options={opcionesInstrmentosMedicion}
                                    // optionLabel="value"
                                    // display="chip"
                                    filter
                                    // placeholder="Select Cities" 
                                    // maxSelectedLabels={3}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Instrumentos de medición
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
                                setModalCrearEditarProyectos(false);
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
