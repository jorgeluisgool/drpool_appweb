import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import React, { useEffect, useState } from 'react'
import { api } from '../../helpers/variablesGlobales';
import { addLocale } from 'primereact/api';

import { format, parse } from 'date-fns';
import { DialogConfirmacion } from '../../../ui/components/DialogConfirmacion';
import useAuth from '../../hooks/useAuth';
import { DialogNombreYaExiste } from '../../../ui/components/DialogNombreYaExiste';

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
  numeroproyecto: '',
  proyectoSedes: [],
  tiposervicio: '',
  fechainiciocontrato: new Date(),
  fechafincontrato: new Date(),
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

export const FormProyectos = ({ modalCrearEditarProyectos, setModalCrearEditarProyectos, proyectoAlbercaSeleccionado, setVentanaCarga, setModalRegistroGuardado, clienteSelect, setClienteSelect, clientesActivos, sedeSelect, setSedeSelect, sedes, setMensajeNoAlbercasEnSedes, setModalWarning, nombreDuplicadoStateModal, setNombreDuplicadoStateModal }) => {

  const { userAuth: usuarioLogiado, setUserAuth } = useAuth();

  const [albercas, setAlbercas] = useState();
  const [fielValue, setFieldValue] = useState();
  const [editFields, setEditFields] = useState(true);
  const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);

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

  // Función para convertir la fecha en formato válido de la fecha
  const parseDate = (dateString) => {
    if (typeof dateString === "string") {
      const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
      return parsedDate;
    } else {
      return dateString
    }
  };

  const handleSubmit = (values) => {
    values.nombreproyectoalberca = values.nombreproyectoalberca.toUpperCase();

    // const formattedDate = format(values.fechainiciocontrato, "dd/MM/yy");
    // values.fechainiciocontrato = formattedDate;
    // values.fechafincontrato = formattedDate;

    if (typeof values.fechainiciocontrato !== "string") {
      const formattedDate = format(values.fechainiciocontrato, "dd/MM/yy");
      values.fechainiciocontrato = formattedDate;
    }
    if (typeof values.fechafincontrato !== "string") {
      const formattedDate2 = format(values.fechafincontrato, "dd/MM/yy");
      values.fechafincontrato = formattedDate2;
    }

    console.log(values.proyectoSedes);

    // Aquí es donde puedes manipular los valores antes de enviarlos al servidor
    const proyectoSedes = values.proyectoSedes.map(sede => ({
      idproyectosedes: 0, // Ajusta este valor según tus necesidades
      sede: sede
    }));

    const valuesToSend = {
      ...values,
      proyectoSedes: proyectoSedes
    };



    console.log("PROYECTO--> ", valuesToSend);

    setVentanaCarga(true);

    fetch(`${api}/nuevo/proyectoalberca`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesToSend),
      })
        .then((response) => response.text())
        .then((responseData) => {
            console.log(responseData);

          if (responseData === "El nombre de proyecto ya se encuentra registrado") {
            setVentanaCarga(false);
            setNombreDuplicadoStateModal(true);
          }else{
            setVentanaCarga(false);
            setModalRegistroGuardado(true);
            setModalCrearEditarProyectos(false);
          }

          if(responseData == "se guardo correctamente el proyecto"){
            setModalCrearEditarProyectos(false);
            setVentanaCarga(false);
            setModalRegistroGuardado(true);
          }else{
            if (responseData.match("No hay algun equipo relacionado con la alberca")) {
              // setModalCrearEditarProyectos(false);
              setVentanaCarga(false);
              setMensajeNoAlbercasEnSedes(`No hay algun "EQUIPO" relacionado con la o las albercas: ${responseData.split(":")[1]}, de la sede o sedes selecionadas.`);
              setModalWarning(true)
            }
            if (responseData.match("No hay albercas relacionadas")) {
              // setModalCrearEditarProyectos(false);
              setVentanaCarga(false);
              setMensajeNoAlbercasEnSedes(`La sede o sedes: ${responseData.split(",")[1]} no tiene alguna alberca relacionada, deberas dar de alta una alberca o relacionarle a una ya existente. `);
              setModalWarning(true)
            }
          }   
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

  console.log(proyectoAlbercaSeleccionado)
  console.log("SEDES", sedes)



  return (
    <>
    <DialogNombreYaExiste
      nombreDuplicadoStateModal={nombreDuplicadoStateModal}
      setNombreDuplicadoStateModal={setNombreDuplicadoStateModal}
      mensajeNombreDuplicado={"El nombre del proyecto ya existe."}
    />
      <Dialog header={`Proyectos`} visible={modalCrearEditarProyectos} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => { setModalCrearEditarProyectos(false); setEditFields(true) }} className='pt-16'>
      <Formik
        initialValues={proyectoAlbercaSeleccionado === undefined ? initialValues : proyectoAlbercaSeleccionado}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};

          if (!values.nombreproyectoalberca) {
            errors.nombreproyectoalberca = 'Este campo es obligatorio';
          }
          if (!values.numeroproyecto) {
            errors.numeroproyecto = 'Este campo es obligatorio';
          }
          if (!values.proyectoSedes || values.proyectoSedes.length === 0) {
            errors.proyectoSedes = 'Este campo es obligatorio';
          }
          if (!values.tiposervicio) {
            errors.tiposervicio = 'Este campo es obligatorio';
          }
          if (!values.estatus) {
            errors.estatus = 'Este campo es obligatorio';
          }
        
          // if (!values.proyectoSedes || Object.keys(values.proyectoSedes).length === 0) {
          //   errors.proyectoSedes = 'Es obligatorio seleccionar un cliente';
          // }

          return errors
        }}
      >
        {({ values, field, form }) => (

          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
              <div className="p-inputgroup mb-5 mt-8 relative">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    as={InputText}
                    name="nombreproyectoalberca"
                    value={values.nombreproyectoalberca.toUpperCase()}
                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}
                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Nombre del proyecto *
                  </label>
                </span>
                <div className="absolute left-2 mt-14">
                  <ErrorMessage
                    name="nombreproyectoalberca"
                    render={(msg) => (
                      <div className="flex items-center">
                        <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                          <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="p-inputgroup mb-5 mt-8 relative">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    as={InputText}
                    name="numeroproyecto"
                    value={values.numeroproyecto}
                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}

                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Número del proyecto *
                  </label>
                </span>
                <div className="absolute left-2 mt-14">
                  <ErrorMessage
                    name="numeroproyecto"
                    render={(msg) => (
                      <div className="flex items-center">
                        <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                          <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="p-inputgroup mb-5 mt-8">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    as={Dropdown}
                    name="clienteSelect"
                    value={clienteSelect}
                    options={clientesActivos}
                    optionLabel="cliente"
                    itemTemplate={renderClienteOption}
                    onChange={(e) => {
                      setClienteSelect(e.target.value)
                      values.proyectoSedes = [];
                    }}
                    filter
                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}
                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Cliente *
                  </label>
                </span>
              </div>
              <div className="p-inputgroup mb-5 mt-8 relative">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    as={MultiSelect}
                    name="proyectoSedes"
                    value={values.proyectoSedes}
                    options={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente)}
                    optionLabel="nombre"
                    //disabled={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente && editFields == false).length === 0}
                    disabled={proyectoAlbercaSeleccionado != undefined &&
                      editFields}
                    filter
                    //disabled={sedes.filter(sede => sede.estatus === "ACTIVO" && sede.cliente.cliente === clienteSelect.cliente).length === 0}
                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Sedes *
                  </label>
                </span>
                <div className="absolute left-2 mt-14">
                  <ErrorMessage
                    name="proyectoSedes"
                    render={(msg) => (
                      <div className="flex items-center">
                        <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                          <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* <div className="p-inputgroup mb-5 mt-8">
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
                        </div> */}
              <div className="p-inputgroup mb-5 mt-8 relative">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    as={Dropdown}
                    name="tiposervicio"
                    value={values.tiposervicio}
                    options={opcionesTipoServicio}
                    optionLabel="value"
                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}
                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Tipo de servicio *
                  </label>
                </span>
                <div className="absolute left-2 mt-14">
                  <ErrorMessage
                    name="tiposervicio"
                    render={(msg) => (
                      <div className="flex items-center">
                        <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                          <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="p-inputgroup mb-5 mt-8">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent md:w-20rem"
                    as={Calendar}
                    name="fechainiciocontrato"
                    value={parseDate(values.fechainiciocontrato)}
                    dateFormat="dd/MM/yy"
                    locale='es'
                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}
                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Fecha de inicio de contratación *
                  </label>
                </span>
              </div>
              <div className="p-inputgroup mb-5 mt-8">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent md:w-20rem"
                    as={Calendar}
                    name="fechafincontrato"
                    value={parseDate(values.fechafincontrato)}
                    dateFormat="dd/MM/yy"
                    locale='es'

                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}

                    required

                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Fecha de finalización de contratación *
                  </label>
                </span>
              </div>
              <div className="p-inputgroup mb-5 mt-8 relative">
                <span className='p-float-label relative'>
                  <Field
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    as={Dropdown}
                    name="estatus"
                    value={values.estatus}
                    options={opcionesStatus}
                    optionLabel="value"
                    disabled={
                      proyectoAlbercaSeleccionado != undefined &&
                      editFields}
                    required
                  />
                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                    <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                  </span>
                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                    Estatus *
                  </label>
                </span>
                <div className="absolute left-2 mt-14">
                  <ErrorMessage
                    name="estatus"
                    render={(msg) => (
                      <div className="flex items-center">
                        <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                          <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
              {
                usuarioLogiado[0]?.perfile.perfil === 'SUBDIRECTOR' ?
                  <>
                    <button
                      type="button"
                      className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                      onClick={() => setModaAceptarlAbrirCerrar(true)}
                    >
                      <ion-icon name="save"></ion-icon> Guardar
                    </button>
                    {modaAceptarlAbrirCerrar ?
                      <DialogConfirmacion modaAceptarlAbrirCerrar={modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields={setEditFields} /> : <></>}
                    {proyectoAlbercaSeleccionado != undefined ? (
                      <button
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => {

                          setEditFields(!editFields);
                        }}
                        type='button'
                      >
                        {editFields ? <p> <ion-icon name="create"></ion-icon> Editar</p> : <p> <ion-icon name="alert-circle"></ion-icon> No editar</p>}
                      </button>
                    ) : <></>
                    }
                    <button
                      className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                      onClick={() => {
                        setModalCrearEditarProyectos(false);
                      }}
                      type='button'
                    >
                      <ion-icon name="close-circle"></ion-icon> Cancelar
                    </button>
                  </>
                  : <></>
              }
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
    </>
  )
}
