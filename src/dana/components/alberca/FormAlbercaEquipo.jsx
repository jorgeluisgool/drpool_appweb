import { Field } from 'formik'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import './hr.css'
        

const opcionesEstatusBombeo = [
    { label: 'FUNCIONANDO', value: 'FUNCIONANDO' },
    { label: 'NO FUNCIONANDO', value: 'NO FUNCIONANDO' }
];

const opcionesCombustibleCaldera = [
    { label: 'GAS L.P.', value: 'GAS L.P.' },
    { label: 'GAS NATURAL', value: 'GAS NATURAL' },
    { label: 'DIESEL', value: 'DIESEL' },
];

export const FormAlbercaEquipo = () => {
  return (
    <>
    {/* SECCIÓN DE BOMBEO */}
    <div className='mt-4 mb-8 p-4 bg-slate-50 shadow-md rounded-md'>
        <h1 className='text-lg font-semibold'>- Bombeo</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="bombeonumero"
                        value={''}
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
        </div>
        <hr className="divider" />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="Potenciabomba"
                        value={''}
                        keyfilter="pint"
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Potencia de la bomba
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="marcabombeo"
                        value={''}
                        
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
                        name="modelobombeo"
                        value={''}
                
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
                        name="capacidad"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Capacidad 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="voltaje"
                        value={''}
                        keyfilter="pint"
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Voltaje 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={Dropdown}
                        name="estatus"
                        value={''}
                        options={opcionesEstatusBombeo}
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
                        name="voltaje"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Fecha de último mantenimiento  
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="numerofases"
                        value={''}
                        keyfilter="pint"
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Número de fases 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5 col-span-4">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputTextarea}
                        name="observaciones"
                        value={''}
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
    </div>
    {/* SECCION DE FILTRADO */}
    <div className='mt-4  p-4 bg-slate-50 shadow-md rounded-md'>
    <h1 className='text-lg font-semibold'>- Filtrado</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="flitradonumero"
                        value={''}
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
                        name="filtradoestatus"
                        value={''}
                        options={opcionesEstatusBombeo}
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
                        name="filtradofecha"
                        value={''}
                        
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
        <h1 className='text-md font-semibold'>Arena</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>      
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="arenamarca"
                        value={''}
                        
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
                        name="arenamodelo"
                        value={''}
                        
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
                        name="arenacantidadarena"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Arena
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="arenacantidadgrava"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Grava 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="arenacantidadmaxima"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad Max
                    </label>
                </span>
            </div>
        </div>
        <hr className="divider" />
        <h1 className='text-md font-semibold'>Zeolita</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="zeolitamarca"
                        value={''}
                        
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
                        name="zeolitamodelo"
                        value={''}
                        
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
                        name="zeolitacantidadarena"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Arena
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="zeolitacantidadgrava"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Grava 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="zeolitacantidadmaxima"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad Max
                    </label>
                </span>
            </div>
        </div>
        <hr className="divider" />
        <h1 className='text-md font-semibold'>Cartucho</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="cartuchomarca"
                        value={''}
                        
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
                        name="cartuchomodelo"
                        value={''}
                        
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
                        name="cartuchocantidadarena"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Arena
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="cartuchocantidadgrava"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Grava 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="cartuchocantidadmaxima"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad Max
                    </label>
                </span>
            </div>
        </div>
        <hr className="divider" />
        <h1 className='text-md font-semibold'>Esponja vidrio/otra </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="esponjamarca"
                        value={''}
                        
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
                        name="esponjamodelo"
                        value={''}
                        
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
                        name="esponjacantidadarena"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Arena
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="esponjacantidadgrava"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad de Grava 
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="esponjacantidadmaxima"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Cantidad Max
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
                        name="observacionesfiltrado"
                        value={''}
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
    </div>
    {/* SECCION DE CALENTAMIENTO */}
    <div className='mt-4  p-4 bg-slate-50 shadow-md rounded-md'>
    <h1 className='text-lg font-semibold'>- Calentamiento</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="calentamientonumero"
                        value={''}
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
        </div>
        <hr className="divider" />
        <h1 className='text-md font-semibold'>Bomba de calor </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="marcabombacalor"
                        value={''}
                        
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
                        name="modelobombacalor"
                        value={''}
                        
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
                        name="capacidadbombacalor"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Capacidad
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="voltajebombacalor"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Voltaje
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="numerofasesbombacalor"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Número de fases
                    </label>
                </span>
            </div>
        </div>
        <hr className="divider" />
        <h1 className='text-md font-semibold'>Caldera</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={InputText}
                        name="marcacaldera"
                        value={''}
                        
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
                        name="modelocaldera"
                        value={''}
                        
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
                        name="capacidadcaldera"
                        value={''}
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Capacidad
                    </label>
                </span>
            </div>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Field
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        as={Dropdown}
                        name="combustiblecaldera"
                        value={''}
                        options={opcionesCombustibleCaldera}
                        optionLabel="label"
                        
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Combustible
                    </label>
                </span>
            </div>
        </div>
    </div>
    </>
  )
}
