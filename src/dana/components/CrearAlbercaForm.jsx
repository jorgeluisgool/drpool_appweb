import { Field, Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';
        
import React, { useState } from 'react'
import { api } from '../helpers/variablesGlobales';
import { AlbercaDraw } from './AlbercaDraw';

const opcionesStatus = [
  { label: 'ACTIVO', value: 'ACTIVO' },
  { label: 'INACTIVO', value: 'INACTIVO' }
];

const opcionesTipoAlberca = [
  { label: 'OLÍMPICA', value: 'OLIMPICA' },
  { label: 'SEMIOLÍMPICA', value: 'SEMIOLÍMPICA' },
  { label: 'FOSA DE CLAVADOS', value: 'FOSA DE CLAVADOS' },
  { label: 'CHAPOTEADERO', value: 'CHAPOTEADERO' },
  { label: 'ALBERCA RECREATIVA', value: 'ALBERCA RECREATIVA' },
  { label: 'JACUZZI', value: 'JACUZZI' }
];

const opcionesCaracteristicaAlberca = [
  { label: 'TECHADA', value: 'TECHADA' },
  { label: 'NO TECHADA', value: 'NO TECHADA' }
];

export const CrearAlbercaForm = ({modalAlberca, setModalAlberca, sedes, albercaSeleccionada, ventanaCarga, setVentanaCarga, setModalRegistroGuardado, clientesActivos, clienteSelect, setClienteSelect}) => {

    console.log(albercaSeleccionada);

    const initialValues = {
        nombrealberca: '',
        tipoalberca: '',
        caracteristica: '',
        capacidad: '',
        medidalargo: '',
        medidaancho: '',
        profundidadminima: '',
        profundidadmaxima: '',
        ubicacion: '',
        sede: {
          correo: '',
          direccion: '',
          encargado: '',
          idsede: '',
          nombre: '',
          telefono: ''
        },
        equiponombre: '',
        tipoequipo: ''
    };

    const onSubmit = (values, { resetForm }) => {
        // console.log(values);
        setVentanaCarga(true);
        values.nombrealberca = values.nombrealberca.toUpperCase();
       
           fetch(`${api}/nueva/alberca`, {
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
                // setModalAlberca(false);
             })
             .catch((error) => {
               console.log(error);
             });
      };


      const renderClienteOption = (option) => {
        return (
          <div className="flex items-center">
            <img src={option.urllogo} alt={option.cliente} className="mr-2" style={{ width: '40px' }} />
            <span>{option.cliente}</span>
          </div>
        );
      };
      
      
  return (
    <>
    <Dialog header='Albercas' visible={modalAlberca} baseZIndex={-1} style={{ width: '80vw', height: '35vw' }} onHide={() => setModalAlberca(false)} className='mx-4 xl:mx-20 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <Formik initialValues={albercaSeleccionada === undefined? initialValues : albercaSeleccionada} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form>  
                <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                    <h1 className='text-2xl font-semibold'>Datos generales</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                    {/* <div className='grid place-items-center'> */}
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="nombrealberca"
                                    value={values.nombrealberca.toUpperCase()}
                                    // onChange={(e) => {
                                    //   handleChange(e);
                                    //   setNombreSede(e.target.value.toUpperCase());
                                    // }}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Nombre de la alberca
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="tipoalberca"
                                    value={values.tipoalberca}
                                    options={opcionesTipoAlberca}
                                    optionLabel="label"
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Tipo de alberca
                                </label>
                            </span>
                        </div> 
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="caracteristica"
                                    value={values.caracteristica}
                                    options={opcionesCaracteristicaAlberca}
                                    optionLabel="label"
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Caracteristica de la alberca
                                </label>
                            </span>
                        </div> 
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="ubicacion"
                                    value={values.ubicacion}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Ubicación
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="clientes"
                                    value={clienteSelect}
                                    options={clientesActivos} 
                                    optionLabel="cliente"
                                    itemTemplate={renderClienteOption}
                                    onChange={(e) => {setClienteSelect(e.target.value)}}
                                    filter
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Cliente al que pertenece
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="sede"
                                    value={values.sede}
                                    options={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente)} 
                                    optionLabel="nombre"
                                    disabled={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente).length === 0}
                                    filter
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Sede a la que pertenece
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
                </div>
                
                <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                    <h1 className='text-2xl font-semibold'>Dimensiones de la alberca</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="capacidad"
                                    value={values.capacidad}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Volumen (m³)
                                </label>
                            </span>
                        </div>  
                        
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="medidalargo"
                                    value={values.medidalargo}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Largo (m)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="medidaancho"
                                    value={values.medidaancho}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Ancho (m)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="profundidadminima"
                                    value={values.profundidadminima}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Profundidad nínima (m)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="profundidadmaxima"
                                    value={values.profundidadmaxima}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Profundidad máxima (m)
                                </label>
                            </span>
                        </div>
                      </div>
                      <div>
                        <h1>Gráfico de alberca</h1>
                        <AlbercaDraw 
                        largoAlberca = {values.medidalargo}
                        anchoAlberca = {values.medidaancho}
                        profundidadMinimaAlberca={values.profundidadminima}
                        profundidadMaximaAlberca={values.profundidadmaxima}
                        />
                      </div>
                        
                    </div>
                  </div>
                    
                    <div className='bg-[#E2E2E2] p-2 rounded-xl'>
                    <h1 className='text-2xl font-semibold'>Equipos de la alberca</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                    <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="equiponombre"
                                    value={values.equiponombre}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Equipo de la
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="tipoequipo"
                                    value={values.tipoequipo}
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Tipo de equipo
                                </label>
                            </span>
                        </div>
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
                          setModalAlberca(false);
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
    </>
  )
}
