import { Field, Form, Formik, useFormikContext } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import React, { useEffect, useState } from 'react'
import { api } from '../../helpers/variablesGlobales';
import { addLocale } from 'primereact/api';

import { format } from 'date-fns';

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

const initialValues = {
    nombreproyectoalberca: '',
    alberca: {

    },
    tiposervicio: '',
    fechainiciocontrato: '',
    fechafincontrato: '', 
    estatus: ''
}

  const opcionesStatus = [
    { label: 'CONTRATO VIGENTE', value: 'VIGENTE' },
    { label: 'CONTRATO FINALIZADO', value: 'CONTRATO FINALIZADO' }
  ];

  const opcionesTipoServicio = [
    { label: 'HOTELERIA', value: 'HOTELERIA' },
    { label: 'GOBIERNO', value: 'GOBIERNO' }, 
    { label: 'RESIDENCIAL', value: 'RESIDENCIAL' }
  ];

  const opcionesInstrmentosMedicion = [
    { label: 'COLORIMETRO', value: 'COLORIMETRO' },
    { label: 'FOTÓMETRO', value: 'FOTOMETRO' },
    { label: 'TERMOMENTRO SUMERGIBLE', value: 'TERMOMENTRO SUMERGIBLE' },
    { label: 'TERMOMENTRO DIGITAL', value: 'TERMOMENTRO DIGITAL' },
    { label: 'TURBIDEZ (VISUAL)', value: 'TURBIDEZ (VISUAL)' },
    { label: 'TURBIDIMETRO', value: 'TURBIDIMETRO' },
  ];

export const FormProyectos = ({modalCrearEditarProyectos, setModalCrearEditarProyectos, proyectoAlbercaSeleccionado, setVentanaCarga, setModalRegistroGuardado, clienteSelect, setClienteSelect, clientesActivos, sedeSelect, setSedeSelect, sedes}) => {

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
      values.nombreproyectoalberca = values.nombreproyectoalberca.toUpperCase();

      const formattedDate = format(values.fechainiciocontrato, "dd/MM/yy");
      values.fechainiciocontrato = formattedDate;
      values.fechafincontrato = formattedDate;

      console.log(values);
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

    const renderClienteOption = (option) => {
      return (
        <div className="flex items-center">
          <img src={option.urllogo} alt={option.cliente} className="mr-2" style={{ width: '40px' }} />
          <span>{option.cliente}</span>
        </div>
      );
    };

  return (
    <Dialog header={`Proyectos`} visible={modalCrearEditarProyectos} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => setModalCrearEditarProyectos(false)} className='pt-16'>
        <Formik initialValues={proyectoAlbercaSeleccionado === undefined? initialValues : proyectoAlbercaSeleccionado} onSubmit={handleSubmit}>
            {({ values, field, form }) => (
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
                                  Cliente
                                </label>
                            </span>
                        </div> 
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={Dropdown}
                                    name="sede"
                                    value={sedeSelect}
                                    options={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente)} 
                                    optionLabel="nombre"
                                    disabled={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente).length === 0}
                                    onChange={(e) => {setSedeSelect(e.target.value)}}
                                    filter
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Sede
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
                                    options={albercas.filter(alberca => alberca.estatus === "ACTIVO" && alberca.sede.nombre === sedeSelect.nombre)} 
                                    optionLabel="nombrealberca"
                                    disabled={albercas.filter(alberca => alberca.estatus === "ACTIVO" && alberca.sede.nombre === sedeSelect.nombre).length === 0}
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
                                    as={Calendar}
                                    name="fechainiciocontrato"
                                    value={values.fechainiciocontrato}
                                    dateFormat="dd/MM/yy"
                                    locale='es'
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                Fecha de inicio de contratación 
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup mb-5 mt-8">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent md:w-20rem"
                                    as={Calendar}
                                    name="fechafincontrato"
                                    value={values.fechafincontrato}
                                    dateFormat="dd/MM/yy"
                                    locale='es'
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                Fecha de finalización de contratación
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
