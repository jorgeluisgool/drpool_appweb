import { Field, Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';
        
import React, { useState } from 'react'
import { api } from '../helpers/variablesGlobales';
import { AlbercaDraw } from './AlbercaDraw';
import { FormAlbercaEquipo } from './alberca/FormAlbercaEquipo';
import { DialogConfirmacion } from '../../ui/components/DialogConfirmacion';


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

const opcionesFormaAlberca = [
  { label: 'CUADRADA', value: 'CUADRADA' },
  { label: 'RECTANGULAR', value: 'RECTANGULAR' },
  { label: 'CIRCULAR', value: 'CIRCULAR' },
  { label: 'CACAHUATE', value: 'CACAHUATE' }
];

export const CrearAlbercaForm = ({modalAlberca, setModalAlberca, sedes, albercaSeleccionada, ventanaCarga, setVentanaCarga, setModalRegistroGuardado, clientesActivos, clienteSelect, setClienteSelect}) => {

  const [acordionEquipoAlberca, setAcordionEquipoAlberca] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [editFields, setEditFields] = useState(true);
  const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);

    const initialValues = {
        nombrealberca: '',
        tipoalberca: '',
        caracteristica: '',
        forma: '',
        capacidad: '',
        medidalargo: '',
        medidaancho: '',
        profundidadminima: '',
        profundidadmaxima: '',
        observaciones: '',
        sede: {
          correo: '',
          direccion: '',
          encargado: '',
          idsede: '',
          nombre: '',
          telefono: ''
        },
        equiponombre: '',
        tipoequipo: '',
        estatus: 'ACTIVO'
    };

    const onSubmit = (values, { resetForm }) => {
        // console.log(values);
        setVentanaCarga(true);
        values.nombrealberca = values.nombrealberca.toUpperCase();
        values.observaciones = values.observaciones.toUpperCase();

        console.log(values);
       
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
                  setModalAlberca(false);
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
      
      const funcionAcordion = () => {
        setAcordionEquipoAlberca(!acordionEquipoAlberca);
        setRotate(!rotate);
      }

      console.log(albercaSeleccionada)

  return (
    <>
    <Dialog header='Albercas' visible={modalAlberca} baseZIndex={-1} style={{ width: '80vw', height: '40vw' }} onHide={() => {setModalAlberca(false); setEditFields(true)}} className='pt-20'>
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
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    required
                                    // onChange={(e) => {
                                    //   handleChange(e);
                                    //   setNombreSede(e.target.value.toUpperCase());
                                    // }}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Nombre de la alberca *
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
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Tipo de alberca *
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
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Caracteristica de la alberca *
                                </label>
                            </span>
                        </div> 
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="observaciones"
                                    value={values.observaciones.toUpperCase()}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Observaciones de la alberca
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
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    filter
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Cliente al que pertenece *
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
                                    //disabled={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente).length === 0}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    filter
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Sede a la que pertenece *
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
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Estatus *
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
                                    as={Dropdown}
                                    name="forma"
                                    value={values.forma}
                                    options={opcionesFormaAlberca} 
                                    optionLabel="value"
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    required
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Forma de la alberca *
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="capacidad"
                                    value={values.capacidad}
                                    onKeyPress={(e) => {
                                      const charCode = e.which || e.keyCode;
                                      // Permitir solo números (0-9) y el punto (.)
                                      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
                                        e.preventDefault();
                                      }
                                    }}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Volumen (m³) *
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
                                    onKeyPress={(e) => {
                                      const charCode = e.which || e.keyCode;
                                      // Permitir solo números (0-9) y el punto (.)
                                      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
                                        e.preventDefault();
                                      }
                                    }}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
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
                                    onKeyPress={(e) => {
                                      const charCode = e.which || e.keyCode;
                                      // Permitir solo números (0-9) y el punto (.)
                                      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
                                        e.preventDefault();
                                      }
                                    }}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
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
                                    onKeyPress={(e) => {
                                      const charCode = e.which || e.keyCode;
                                      // Permitir solo números (0-9) y el punto (.)
                                      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
                                        e.preventDefault();
                                      }
                                    }}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Profundidad mínima (m)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    type="text"
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="profundidadmaxima"
                                    value={values.profundidadmaxima}
                                    // keyfilter={/^\d+(\.\d{0,2})?$/}
                                    disabled={
                                      albercaSeleccionada != undefined &&
                                      editFields
                                    }
                                    onKeyPress={(e) => {
                                      const charCode = e.which || e.keyCode;
                                      // Permitir solo números (0-9) y el punto (.)
                                      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
                                        e.preventDefault();
                                      }
                                    }}
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
                    
                  {/* <div className='bg-[#E2E2E2] p-4 rounded-xl cursor-pointer'>
                    <h1 className="text-2xl font-semibold" onClick={funcionAcordion}>
                    Equipos de la alberca
                        <div style={{ float: 'right' }} className='px-4 text-lg'>
                            <i className={`pi pi-angle-down text-2xl transform ${rotate ? 'rotate-180' : 'rotate-0'} rounded-full hover:border-white p-2 mr-2 transition duration-300 ease-in-out hover:bg-[#245A95] text-[#245A95] hover:text-white hover:shadow-md`}></i>
                        </div>
                        <p className='text-base font-semibold'>Para el llenado de esta sección podria realizarlo ahora en cualquier otro momento.</p>
                    </h1>
                      
                  {
                    acordionEquipoAlberca === true ? <FormAlbercaEquipo/> : <></>
                  } 
                  </div> */}
                    
                {/* </div>  */}
                <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
                <button
                            type="button"
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => setModaAceptarlAbrirCerrar(true)}
                        >
                          <ion-icon name="save"></ion-icon> Guardar
                        </button>
                        
                        {modaAceptarlAbrirCerrar ?
                         <DialogConfirmacion modaAceptarlAbrirCerrar = {modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields ={setEditFields}/> : <></>}

                        
                        {albercaSeleccionada != undefined ? (<button
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => {
                              
                                setEditFields(!editFields);
                            }}
                            type='button'
                        >
                            {editFields ? <p> <ion-icon name="create"></ion-icon> Editar</p> :  <p> <ion-icon name="alert-circle"></ion-icon> No editar</p>}
                        </button>
): <></>}
                    <button
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => {
                          setModalAlberca(false);
                        }}
                        type='button'
                    >
                        <ion-icon name="close-circle"></ion-icon> Cancelar
                    </button>
                </div> 
            </Form>
        )}
        </Formik>
    </Dialog> 
    </>
  )
}
