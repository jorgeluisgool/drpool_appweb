import React, { useState } from 'react'
import { useFetchUsers } from '../hooks/useFetchUsers';
import { SkeletonTable } from './SkeletonTable';
import { Dialog } from 'primereact/dialog';
import { Field, Form, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { api } from '../helpers/variablesGlobales';


const usuarioVacio = {
    idusuario: 0,
    correo: "",
    jefeinmediato: "",
    nombre: "",
    pass: "",
    passtemp: 0,
    telefono: "",
    ubicacion: "",
    usuario: "",
    status: "",
    token: "",
    perfile: {
        idperfil: 0,
        perfil: ""
    },
    clienteAplicacion: {
        idcliente: 0,
        cliente: "",
        urllogo: ""
    },
    vistaCliente: {
        idcliente: 0,
        cliente: "",
        telefono: "",
        direccion: "",
        urllogo: "",
        estatus: "",
        clienteAplicacion: {
            idcliente: 0,
            cliente: "",
            urllogo: ""
        }
    },
};


export const TabaUsuarios = () => {
    const [cargando, setCargando] = useState(false);
    const [modalAbrirCerrar, setModalAbrirCerrar] = useState(false);

    const { data: listaUsuarios, loading: loadingUsuarios } = useFetchUsers();
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(undefined);

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
    const currentRows = listaUsuarios.slice(indexOfFirstRow, indexOfLastRow);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = (value) => {
        console.log(value);
    };

    const guardarUsuario = (usuario)=>{
        fetch(`${api}/crear/usuario`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(usuario) 
          })
            .then(response => response.json())
            .then(responseData => {
              console.log('Respuesta de la API:', responseData);
                return 'Correcto';
            })
            .catch(error =>{ 
                console.log(error);
                return 'Error';
            }
            );

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
                        <table className="min-w-[70%] bg-white rounded-lg overflow-hidden shadow-md">
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
                                            console.log(usuario);
                                            setUsuarioSeleccionado(usuario);
                                            setModalAbrirCerrar(true);
                                        }}

                                        className='cursor-pointer hover:bg-[#E2E2E2]'>
                                        <td className="px-6">
                                            <div className="flex items-center">

                                                <div className="ml-8">
                                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">{usuario.nombre}</div>
                                                    {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{usuario.usuario}</div>
                                            </div>
                                        </td>
                                        <td className="px-6">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{usuario.correo}</div>
                                            </div>
                                        </td>
                                        <td className="px-6">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{usuario.status}</div>
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

                        <Dialog header={`Usuario`} visible={modalAbrirCerrar} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => setModalAbrirCerrar(false)} className='mt-16'>
                            <Formik initialValues={ usuarioSeleccionado === undefined ? usuarioVacio : usuarioSeleccionado} onSubmit={handleSubmit}>
                                {({ values }) => (
                                    <Form>
                                        <div className='px-2 xl:px-10 py-3'>
                                                <span className='p-float-label'>
                                                    <div className='grid grid-cols-2'>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Nombre:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'nombre'}
                                                                        defaultValue={usuarioSeleccionado.nombre}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[A-Z]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Peril:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'perfil'}
                                                                        defaultValue={usuarioSeleccionado.perfile.perfil}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[A-Z]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Correo:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'correo'}
                                                                        defaultValue={usuarioSeleccionado.correo}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[a-z]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Ubicacion:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'ubicacion'}
                                                                        defaultValue={usuarioSeleccionado.ubicacion}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[A-Z]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Telefono:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'telefono'}
                                                                        defaultValue={usuarioSeleccionado.telefono}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[0-9]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Jefe inmediato:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'jefeinmediato'}
                                                                        defaultValue={usuarioSeleccionado.jefeinmediato}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[A-Z]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Estatus:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={InputText}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'status'}
                                                                        defaultValue={usuarioSeleccionado.status}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        keyfilter={RegExp(`[A-Z]`)}
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className=''>
                                                            <p className='text-sm xl:text-base text-[#245A95] font-semibold text-right pr-5'>Contraseña:</p>
                                                        </div>
                                                        <div className=''>
                                                            <span className='p-float-label relative'>
                                                                <div className="p-inputgroup">
                                                                    <Field
                                                                        as={Password}
                                                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                                                        name={'pass'}
                                                                        defaultValue={usuarioSeleccionado.pass}
                                                                        // maxLength={campo.longitud}
                                                                        // onChange={(e) => {
                                                                        //   e.target.value = e.target.value.toUpperCase();
                                                                        // }}
                                                                        toggleMask
                                                                    />
                                                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                                        <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </span>
                                        </div>

                                        <div className="cursor-pointer absolute inset-x-0 bottom-4 left-4 flex gap-3">
                                            <button
                                                type="submit"
                                                className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                onClick={() => {

                                                    const s = guardarUsuario(usuarioSeleccionado);
                                                    console.log('Respuesta peticion: ', s);
                                                }}
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                onClick={() => {
                                                    setUsuarioSeleccionado(undefined);
                                                    setModalAbrirCerrar(false);
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

            }
        </>
    )
}
