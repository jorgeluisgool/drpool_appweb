import { Field, Form, Formik } from 'formik'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState } from 'react'
import { api } from '../../helpers/variablesGlobales'
import { DialogConfirmacion } from '../../../ui/components/DialogConfirmacion'
import { addLocale } from 'primereact/api'



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

const opcionesEstatusBombeo = [
    { label: 'FUNCIONANDO', value: 'FUNCIONANDO' },
    { label: 'NO FUNCIONANDO', value: 'NO FUNCIONANDO' }
];

export const BombeoForm = ({albercaSelected, setVentanaCarga, setModalRegistroGuardado, equipoSelected, equipoSeleccionado = {}, idbomba = 0}) => {

    const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);
    const [editFields, setEditFields] = useState(true);

    const initialValues = {
        alberca: albercaSelected,
        idbomba: idbomba,
        tipoequipo: equipoSelected,
        numero: equipoSeleccionado.numero,
        potencia: equipoSeleccionado.potencia,
        marca: equipoSeleccionado.marca,
        modelo: equipoSeleccionado.modelo,
        capacidad: equipoSeleccionado.capacidad,
        voltaje: equipoSeleccionado.voltaje,
        estatus: equipoSeleccionado.estatus,
        numerofases: equipoSeleccionado.numerofases,
        observaciones: equipoSeleccionado.observaciones,
        fecha_ultimo_mantenimiento: new Date(equipoSeleccionado.fecha_ultimo_mantenimiento)
    }


    const onSubmit = (values, { resetForm }) => {
        console.log(values);

        setVentanaCarga(true);
       
           fetch(`${api}/nuevo/equipobomba`, {
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
                    setVentanaCarga(false);
                    setModalRegistroGuardado(true);
                    resetForm();
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
                </div>
                <hr className="divider" />
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                    <div className="p-inputgroup mb-5 mt-5">
                        <span className='p-float-label relative'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent"
                                as={InputText}
                                name="potencia"
                                value={values.potencia}
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
                                name="marca"
                                value={values.marca}

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
                                name="modelo"
                                value={values.modelo}

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
                                value={values.capacidad}

                            /> 
                            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                            </span>
                            <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Corriente nominal 
                            </label>
                        </span>
                    </div>
                    <div className="p-inputgroup mb-5 mt-5">
                        <span className='p-float-label relative'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent"
                                as={InputText}
                                name="voltaje"
                                value={values.voltaje}
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
                                value={values.estatus}
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
                                name="fecha_ultimo_mantenimiento"
                                value={parseDate(values.fecha_ultimo_mantenimiento)}
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
                    <div className="p-inputgroup mb-5 mt-5">
                        <span className='p-float-label relative'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent"
                                as={InputText}
                                name="numerofases"
                                value={values.numerofases}
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
                </div>
            </div> 
              
        </Form>
    )}
    </Formik>
    </>
  )
}
