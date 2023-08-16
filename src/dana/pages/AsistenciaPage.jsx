import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api';
import { parse, format, addMinutes } from 'date-fns';
import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { TabaUsuarios } from '../components/TablaUsuarios'
import { api } from '../helpers/variablesGlobales';

export const AsistenciaPage = () => {
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const toast = useRef(null);
    const [modalCrearEditarUsuario, setModalCrearEditarUsuario] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState();
    const [ventanaCarga, setVentanaCarga] = useState(false);
    const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false);

    //Pagination Table
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);

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

    const consultarAsistencia = async () => {
        if (fechaInicio != null && fechaFinal != null) {
            const formattedDateInicio = format(fechaInicio, 'dd/MM/yyyy');
            const formattedDateFin = format(fechaInicio, 'dd/MM/yyyy');


            if (fechaInicio <= fechaFinal) {
                const url = `${api}/obtener/usuarios/asistencia/${formattedDateInicio.replaceAll('/', '-')}/${formattedDateFin.replaceAll('/', '-')}`;
                const options = {
                    method: "GET",
                    cache: "no-cache",
                    headers: {
                        "content-type": "application/json; charset=UTF-8"
                    },
                };
                const data = await fetch(url, options).then((resp) => resp.json())
                    .catch((resp) => {
                        console.log('Error al ejecutar la consulta: ', resp);
                    });
                console.log(data);
            } else {
                showError('Error de fechas', 'La fecha de inicio tiene que ser mayor a la fecha final');

            }
        } else {
            console.log('Sin fecha seleccionada');
            showError('Sin fecha seleccionada', 'Selecciona la fecha de inicio y la fecha final');
        }
    }

    const showError = (titulo, mensaje) => {
        toast.current.show({ severity: 'error', summary: titulo, detail: mensaje, life: 3000 });
    }

    return (
        <>
            <Toast ref={toast} />
            <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Asistencia</h1>
            <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-12'>
                <h1 className="text-2xl font-bold text-[#245A95] pb-4">Pendiente</h1>

                <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
                    <span className='p-float-label relative py-4 '>
                        <Calendar
                            className="w-full appearance-none focus:outline-none bg-transparent"
                            value={fechaInicio}
                            name="fechainicio"
                            onChange={(e) => setFechaInicio(e.value)}
                            dateFormat='dd/mm/yy'
                            locale='es'
                        />
                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-calendar-plus text-[#245A95] font-bold text-2xl"></i>
                        </span>
                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Fecha inicio
                        </label>
                    </span>
                </div>
                <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
                    <span className='p-float-label relative py-4 '>
                        <Calendar
                            className="w-full appearance-none focus:outline-none bg-transparent"
                            value={fechaFinal}
                            name="fechainicio"
                            onChange={(e) => setFechaFinal(e.value)}
                            dateFormat='dd/mm/yy'
                            locale='es'
                        />
                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-calendar-plus text-[#245A95] font-bold text-2xl"></i>
                        </span>
                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Fecha final
                        </label>
                    </span>
                </div>
                <Button label='Consultar'
                    onClick={consultarAsistencia}
                />

                {
                    listaUsuarios.length == 0 ?
                    <h1 className="text-2xl font-bold text-[#245A95] pb-4">Sin registros para este intervalo de fechas</h1>
                        :
                        <div>
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
                                                        usuario.status === 'ACTIVO' ?
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
                                    Total de usuarios:
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
                        </div>
                }
            </div>
        </>
    )
}
