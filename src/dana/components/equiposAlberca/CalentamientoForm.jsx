import { Field, Form, Formik } from 'formik'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react'
import { api } from '../../helpers/variablesGlobales';
import { DialogConfirmacion } from '../../../ui/components/DialogConfirmacion';
import { addLocale } from 'primereact/api';
import { format, parse } from 'date-fns';
import useAuth from '../../hooks/useAuth';

const opcionesCombustibleCaldera = [
    { label: 'GAS L.P.', value: 'GAS L.P.' },
    { label: 'GAS NATURAL', value: 'GAS NATURAL' },
    { label: 'DIESEL', value: 'DIESEL' },
];

const opcionesEstatus = [
    { label: 'FUNCIONANDO', value: 'FUNCIONANDO' },
    { label: 'NO FUNCIONANDO', value: 'NO FUNCIONANDO' }
];

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

export const CalentamientoForm = ({albercaSelected, setVentanaCarga, setModalRegistroGuardado, equipoSelected, equipoSeleccionado = {}, idcalentamiento = 0}) => {

    const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);
    const [editFields, setEditFields] = useState(true);

    const { actualizarEquipo, setActualizarEquipo} = useAuth();

    const initialValues = {
        alberca: albercaSelected || '',
        tipoequipo: equipoSelected || '',
        idcalentamiento: idcalentamiento || '',
        numero: equipoSeleccionado.numero || '',
        estatus: equipoSeleccionado.estatus || '',
        fecha_ultimo_mantenimiento: equipoSeleccionado.fecha_ultimo_mantenimiento ? new Date(equipoSeleccionado.fecha_ultimo_mantenimiento) : '',
        marcabomba: equipoSeleccionado.marcabomba || '',
        modelobomba: equipoSeleccionado.modelobomba || '',
        capacidadbomba: equipoSeleccionado.capacidadbomba || '',
        voltajebomba: equipoSeleccionado.voltajebomba || '',
        numerofasesbomba: equipoSeleccionado.numerofasesbomba || '',
        marcacaldera: equipoSeleccionado.marcacaldera || '',
        modelocaldera: equipoSeleccionado.modelocaldera || '',
        capacidadcaldera: equipoSeleccionado.capacidadcaldera || '',
        combustiblecaldera: equipoSeleccionado.combustiblecaldera || '',
        marcacolector: equipoSeleccionado.marcacolector || '',
        modelocolector: equipoSeleccionado.modelocolector || '',
        numeropaneles: equipoSeleccionado.numeropaneles || '',
        numerointercambiador: equipoSeleccionado.numerointercambiador || '',
        modelointercambiador: equipoSeleccionado.modelointercambiador || '',
        capacidadintercambiador: equipoSeleccionado.capacidadintercambiador || '',
        informacionintercambiador: equipoSeleccionado.informacionintercambiador || '',
        observaciones: equipoSeleccionado.observaciones || ''
    }

    const onSubmit = (values, { resetForm }) => {
        console.log(values);

        setVentanaCarga(true);
       
            fetch(`${api}/nuevo/equipocalentamiento`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(values),
            })
              .then((response) => response.text())
              .then((responseData) => {
                    console.log(responseData);
                    setActualizarEquipo(false);
                    setVentanaCarga(false);
                    setModalRegistroGuardado(true);
                    
                    // resetForm();
              })
              .catch((error) => {
                console.log(error);
              });
    }

    const parseDate = (dateString) => {
        if (typeof dateString === "string") {
            const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
            return parsedDate;
        } else {
            return dateString
        }  
      };

    console.log("Calentamiento equipo seleccionado:  " + equipoSeleccionado);

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form>
                <div className='mt-4 mb-8 p-4 transition duration-500 ease-in-out relative w-full max-w-full rounded overflow-hidden group'>
                <h1 className='font-bold text-sm xl:text-2xl mb-2 text-[#245A95]'><ion-icon name="caret-forward-outline"></ion-icon>Calentamiento</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="numero"
                                    value={values.numero}
                                    required
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Número *
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
                                    value={(values.fecha_ultimo_mantenimiento)}
                                    dateFormat="dd/MM/yy"
                                    locale='es'
                                    
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
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Bomba de calor </h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="marcabomba"
                                    value={values.marcabomba}

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
                                    name="modelobomba"
                                    value={values.modelobomba}

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
                                    name="capacidadbomba"
                                    value={values.capacidadbomba}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Capacidad (BTU/h)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="voltajebomba"
                                    value={values.voltajebomba}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Voltaje (V)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="numerofasesbomba"
                                    value={values.numerofasesbomba}

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
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Caldera</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="marcacaldera"
                                    value={values.marcacaldera}

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
                                    value={values.modelocaldera}

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
                                    value={values.capacidadcaldera}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Capacidad (BTU)
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="combustiblecaldera"
                                    value={values.combustiblecaldera}
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
                    <hr className="divider" />
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Colector solar</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="marcacolector"
                                    value={values.marcacolector}

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
                                    name="modelocolector"
                                    value={values.modelocolector}

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
                                    name="numeropaneles"
                                    value={values.numeropaneles}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Número de paneles
                                </label>
                            </span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <h1 className='text-md font-semibold xl:text-xl text-[#245A95]'>Intercambiador de calor</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="numerointercambiador"
                                    value={values.numerointercambiador}
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
                                    as={InputText}
                                    name="modelointercambiador"
                                    value={values.modelointercambiador}

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
                                    name="capacidadintercambiador"
                                    value={values.capacidadintercambiador}

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
                                    name="informacionintercambiador"
                                    value={values.informacionintercambiador}

                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Información complementaria
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
                            type="button"
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => setModaAceptarlAbrirCerrar(true)}
                        >
                          <ion-icon name="save"></ion-icon> Guardar
                        </button>
                        
                        {modaAceptarlAbrirCerrar ?
                         <DialogConfirmacion modaAceptarlAbrirCerrar = {modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields={setEditFields}/> : <></>}

                        {/* <button
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => {
                              setModalAlberca(false);
                            }}
                            type='button'
                        >
                            Cancelar
                        </button> */}
                    </div>
                </div>
            </Form>
        )}
    </Formik>
    </>
  )
}
