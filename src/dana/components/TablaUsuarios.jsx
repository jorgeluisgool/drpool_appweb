import React, { useEffect, useState } from 'react'
import { useFetchUsers } from '../hooks/useFetchUsers';
import { SkeletonTable } from './SkeletonTable';
import { Dialog } from 'primereact/dialog';
import { Field, Form, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { api } from '../helpers/variablesGlobales';
import { Dropdown } from 'primereact/dropdown';
import useAuth from '../hooks/useAuth';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { format, parse } from 'date-fns';
import { DialogConfirmacion } from '../../ui/components/DialogConfirmacion';

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

const opcionesStatus = [
    { label: 'ACTIVO', value: 'ACTIVO' },
    { label: 'INACTIVO', value: 'INACTIVO' }
  ];

export const TabaUsuarios = ({modalCrearEditarUsuario, setModalCrearEditarUsuario, setUsuarioSeleccionado, usuarioSeleccionado, setVentanaCarga, setModalRegistroGuardado, searchTerm}) => {

    const [selectedDateIngreso, setSelectedDateIngreso] = useState(null);
    const [editFields, setEditFields] = useState(true);
    const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);

    console.log(selectedDateIngreso)
    const { userAuth: usuarioLogiado, setUserAuth } = useAuth();
    const { data: listaUsuarios, loading: loadingUsuarios } = useFetchUsers(modalCrearEditarUsuario);

    // Función para convertir la fecha en formato válido de la fecha
    const parseDate = (dateString) => {
        if (typeof dateString === "string") {
            const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
            return parsedDate;
        } else {
            return dateString
        }  
    };

    console.log(listaUsuarios);
    // Filtro para el search
    const filterUsuarios = listaUsuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const usuarioVacio = {
        // idusuario: 0,
        correo: "",
        jefeinmediato: '',
        nombre: "",
        pass: "",
        passtemp: 0,
        telefono: "",
        fechaingreso: new Date(),
        fechanacimiento: new Date(),
        ubicacion: "",
        usuario: "",
        status: "ACTIVO",
        token: "",
        perfile: {

        },
        clienteAplicacion: usuarioLogiado[0]?.clienteAplicacion,
        vistaCliente: usuarioLogiado[0]?.vistaCliente
    };

    const [cargando, setCargando] = useState(false);
    const [perfil, setPerfil] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const isSelected = (index) => (selectedRows.includes(index));
    const handleSelectedRow = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((item) => item !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const totalRows = listaUsuarios.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Obtener índice del último registro en la página actual
    const indexOfLastRow = currentPage * rowsPerPage;
    // Obtener índice del primer registro en la página actual
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    // Obtener los registros para la página actual
    const currentRows = filterUsuarios.slice(indexOfFirstRow, indexOfLastRow);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = (values) => {
        values.nombre = values.nombre.toUpperCase();
        values.usuario = values.usuario.toUpperCase();
        values.ubicacion = values.ubicacion.toUpperCase();

        if(typeof values.fechaingreso !== "string"){
            const formattedDate = format(values.fechaingreso, "dd/MM/yy");
            values.fechaingreso = formattedDate;
        }
        if(typeof values.fechanacimiento !== "string"){
            const formattedDate2 = format(values.fechanacimiento, "dd/MM/yy");
            values.fechanacimiento = formattedDate2;
        }
        
        console.log(values);

         setVentanaCarga(true);

          fetch(`${api}/crear/usuario`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify(values) 
            })
              .then(response => response.json())
              .then(responseData => {
                 setModalCrearEditarUsuario(false);
                 setVentanaCarga(false);
                 setModalRegistroGuardado(true);
    
                console.log('Respuesta de la API:', responseData);
                  return 'Correcto';
              })
              .catch(error =>{ 
                  console.log(error);
                  return 'Error';
              }
              );
    };

    // Obtener los perfiles
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${api}/obtener/perfiles`);
            const jsonData = await response.json();
            setPerfil(jsonData);
          } catch (error) {
            console.log('Error:', error);
          }
        };
   
        fetchData();
    }, []);

    const handleDateChange = (date) => {
        // date = parse('dd/MM/yyyy', new Date());  
        console.log(date)
        setSelectedDateIngreso(date); // Actualiza la fecha seleccionada en el estado local
      }

    return (
        <>
            {cargando && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex items-center transition duration-500 ease-in-out">
                        <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
                            <img src="/src/assets/isae.png" alt="Icono" className="h-20 xl:h-40 mr-1 animate-spin" />
                        </span>
                        <img src="/src/assets/letras_isae.png" alt="Icono" className="h-20 xl:h-40 mr-2" />
                    </div>
                    <div className='fixed pt-36 xl:pt-60'>
                        <h1 className='text-[#C41420] text-4xl font-black animate-pulse'>Cargando...</h1>
                    </div>
                </div>
            )}
            {
                loadingUsuarios ?
                    <SkeletonTable />
                    :
                    <>
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-[#245A95] text-white uppercase">
                                <tr className='text-left'>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center pl-12">
                                            <span>Nombre</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Usuario</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Correo</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Perfil</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Estatus</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200" >
                                {currentRows.map((usuario, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            //Click para mostrar informacion del usuario
                                            setUsuarioSeleccionado(usuario);
                                            setModalCrearEditarUsuario(true);
                                        }}

                                        className='cursor-pointer hover:bg-[#E2E2E2]'>
                                        <td className="px-6 py-2">
                                            <div className="flex items-center">
                                                <div className="ml-8">
                                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">{usuario.nombre}</div>
                                                    {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{usuario.usuario}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{usuario.correo}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{usuario.perfile.perfil}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                {
                                                    usuario.status === 'ACTIVO'?
                                                    <div className="text-sm font-medium text-green-600"><ion-icon name="radio-button-on-outline"></ion-icon> {usuario.status}</div>
                                                    :
                                                    <div className="text-sm font-medium text-red-600"><ion-icon name="radio-button-off-outline"></ion-icon> {usuario.status}</div>
                                                }
                                                
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <span className="mr-2 text-[#245A95] font-bold text-lg">Filas por página:</span>
                                <select
                                    className="border border-gray-300 rounded px-3 py-1"
                                    value={rowsPerPage}
                                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                            <h1 className='text-[#245A95] font-bold text-lg'>
                                Total de registros:
                                <span className='text-gray-700'> {totalRows}</span>
                            </h1>
                            <div className="flex items-center pl-4">
                                <span className="mr-2 text-[#245A95] font-bold text-lg">
                                    Página <span className='text-gray-700'>{currentPage}</span> de <span className='text-gray-700'>{totalPages}</span>
                                </span>
                                <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded-l-md focus:outline-none ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
                                            }`}
                                    >
                                        <div className='text-[#245A95] hover:text-white'>
                                            <ion-icon name="caret-back-circle"></ion-icon>
                                        </div>
                                    </button>
                                    <span className="px-3 py-1 bg-gray-300 text-gray-700">{currentPage}</span>
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={indexOfLastRow >= totalRows}
                                        className={`px-3 py-1 rounded-r-md focus:outline-none ${indexOfLastRow >= totalRows ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
                                            }`}
                                    >
                                        <div className='text-[#245A95] hover:text-white'>
                                            <ion-icon name="caret-forward-circle"></ion-icon>
                                        </div>
                                    </button>
                                </nav>
                            </div>
                        </div>
                        {/* MODAL DEL FORMULARIO USUARIOS */}
                        <Dialog header={`Usuario`} visible={modalCrearEditarUsuario} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => {setModalCrearEditarUsuario(false); setEditFields(true)}}  className='pt-12'>
                            <Formik initialValues={ usuarioSeleccionado === undefined ? usuarioVacio : usuarioSeleccionado} onSubmit={handleSubmit}>
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={InputText}
                                                        name="nombre"
                                                        value={values.nombre.toUpperCase()}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Nombre completo del colaborador *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={Dropdown}
                                                        name="perfile"
                                                        value={values.perfile}
                                                        options={perfil.filter((perfil) => (perfil.perfil != 'SUPERADMIN' && perfil.perfil !='ADMINISTRADOR' ))} 
                                                        optionLabel="perfil"
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Rol *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={InputText}
                                                        name="usuario"
                                                        value={values.usuario.toUpperCase()}
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Nombre de usuario *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={InputText}
                                                        name="correo"
                                                        value={values.correo}
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Correo electrónico del colaborador *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={Calendar}
                                                        name="fechaingreso"
                                                        value={parseDate(values.fechaingreso)}
                                                        dateFormat="dd/MM/yy"
                                                        locale='es'
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(date) => {
                                                        //     // Realiza el procesamiento de fecha con parseDateIngreso
                                                        //     const processedDate = parseDateIngreso(date);
                                                        //     console.log(processedDate);
                                                        //     // Actualiza el valor del campo fechaingreso en Formik
                                                        //     setFieldValue('fechaingreso', processedDate);
                                                        //   }}
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Fecha de ingreso
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={Calendar}
                                                        name="fechanacimiento"
                                                        value={parseDate(values.fechanacimiento)}
                                                        dateFormat="dd/MM/yy"
                                                        locale='es'
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Fecha de nacimiento
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={InputText}
                                                        name="ubicacion"
                                                        value={values.ubicacion.toUpperCase()}
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Dirección del colaborador
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={InputText}
                                                        name="telefono"
                                                        value={values.telefono.toUpperCase()}
                                                        keyfilter="pint"
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Teléfono del colaborador *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={Dropdown}
                                                        name="jefeinmediato"
                                                        value={values.jefeinmediato}
                                                        optionValue="nombre"
                                                        options={listaUsuarios}
                                                        optionLabel="nombre"
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        filter
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Jefe inmediato *
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={Dropdown}
                                                        name="status"
                                                        value={values.status}
                                                        options={opcionesStatus} 
                                                        optionLabel="value"
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
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
                                            <div className="p-inputgroup mb-5 mt-8">
                                                <span className='p-float-label relative'>
                                                    <Field
                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                        as={Password}
                                                        name="pass"
                                                        value={values.pass}
                                                        toggleMask
                                                        disabled = {
                                                            usuarioSeleccionado != undefined &&
                                                            editFields}
                                                        // onChange={(e) => {
                                                        //   handleChange(e);
                                                        //   setNombreSede(e.target.value.toUpperCase());
                                                        // }}
                                                        required
                                                    /> 
                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                    </span>
                                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                      Contraseña *
                                                    </label>
                                                </span>
                                            </div>
                                        
                                        </div>
                                            
                                        <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
                                        
                        
                                        {modaAceptarlAbrirCerrar ?
                                        <DialogConfirmacion modaAceptarlAbrirCerrar = {modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields ={setEditFields}/> : <></>}

                                            {usuarioSeleccionado !== undefined ? (
                                              usuarioLogiado[0].perfile.perfil === 'SUBDIRECTOR' ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                        onClick={() => setModaAceptarlAbrirCerrar(true)}
                                                    >
                                                        <ion-icon name="save"></ion-icon> Guardar
                                                    </button>
                                                    <button
                                                      className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                      onClick={() => {
                                                        setEditFields(!editFields);
                                                      }}
                                                      type='button'
                                                    >
                                                      {editFields ? (
                                                        <p> <ion-icon name="create"></ion-icon> Editar</p>
                                                      ) : (
                                                        <p> <ion-icon name="alert-circle"></ion-icon> No editar</p>
                                                      )}
                                                    </button>
                                                    <button
                                                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                        onClick={() => {
                                                            setUsuarioSeleccionado(undefined);
                                                            setModalCrearEditarUsuario(false);
                                                        }}
                                                        type='button'
                                                    >
                                                       <ion-icon name="close-circle"></ion-icon> Cancelar
                                                    </button>
                                                </>
                                                
                                              ) : null // Renderiza null si el perfil no es SUBDIRECTOR
                                            ) : null // Renderiza null si usuarioSeleccionado es undefined
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Dialog>
                    </>
            }
        </>
    )
}
