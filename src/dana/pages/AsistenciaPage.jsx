import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api';
import { parse, format, addMinutes } from 'date-fns';
import { Dialog } from 'primereact/dialog';
import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { TabaUsuarios } from '../components/TablaUsuarios'
import { api } from '../helpers/variablesGlobales';
import { Player } from '@lottiefiles/react-lottie-player';
import { Image } from 'primereact/image';

export const AsistenciaPage = () => {
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaAsistencia, setListaAsistencia] = useState([]);
    const toast = useRef(null);
    const [modalCrearEditarUsuario, setModalCrearEditarUsuario] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState();
    const [ventanaCarga, setVentanaCarga] = useState(false);
    const [modalAsistencia, setModalAsistencia] = useState(false);

    //Pagination Table
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPageA, setCurrentPageA] = useState(1);
    const [rowsPerPageA, setRowsPerPageA] = useState(10);
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

    const totalRowsA = listaAsistencia.length;
    const totalPagesA = Math.ceil(totalRowsA / rowsPerPageA);

    // Obtener índice del último registro en la página actual
    const indexOfLastRowA = currentPageA * rowsPerPageA;
    // Obtener índice del primer registro en la página actual
    const indexOfFirstRowA = indexOfLastRowA - rowsPerPageA;
    // Obtener los registros para la página actual
    const currentRowsA = listaAsistencia.slice(indexOfFirstRowA, indexOfLastRowA);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const consultarAsistencia = async () => {
        if (fechaInicio != null && fechaFinal != null) {
            const formattedConsutaInicio = format(fechaInicio, 'yy/MM/dd');
            const formattedConsutaFin = format(fechaFinal, 'yy/MM/dd');


            if (fechaInicio <= fechaFinal) {
                setVentanaCarga(true);
                const url = `${api}/obtener/usuarios/asistencia/${formattedConsutaInicio.replaceAll('/', '-')}/${formattedConsutaFin.replaceAll('/', '-')}`;
                console.log(url);
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

                setListaUsuarios(data);
                setVentanaCarga(false);
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
            {ventanaCarga && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Player
                            src="https://lottie.host/6e504b56-2da0-430e-9861-0a2186e4ae0f/hkIjXR28gA.json"
                            className="player absolute bottom-0 w-full"
                            loop
                            autoplay
                            speed={0.2}
                            style={{ width: '100%', zIndex: -1 }} // Ajusta el zIndex a un valor negativo para que se vea por debajo
                        />
                        <div className="hidden lg:flex h-full w-full items-center justify-center" style={{ flexDirection: 'column' }}>
                            <div className="w-auto h-auto mx-auto">
                                <img className="" src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5" alt="Your Company" />
                                <h1 className='animate-pulse text-3xl text-white pt-6'>Cargando<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                            onClick={async () => {
                                                console.log(usuario);
                                                const formattedConsutaInicio = format(fechaInicio, 'yy/MM/dd');
                                                const formattedConsutaFin = format(fechaFinal, 'yy/MM/dd');
                                                setVentanaCarga(true);
                                                const url = `${api}/obtener/asistencia/${usuario.idusuario}/${formattedConsutaInicio.replaceAll('/', '-')}/${formattedConsutaFin.replaceAll('/', '-')}`;
                                                console.log(url);
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
                                                setListaAsistencia(data);
                                                setVentanaCarga(false);

                                                setModalAsistencia(true);
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
                                    Total de asistencias:
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

            <Dialog header={`Asistencias`} visible={modalAsistencia} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => setModalAsistencia(false)} className='mx-4 xl:mx-20 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
                {
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
                                            <span>Hora  de entrada</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Hora de salida</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Foto</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <div className="items-center">
                                            <span>Ubicacion</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200" >
                                {currentRowsA.map((asistencia, index) => (
                                    <tr
                                        key={index}
                                        className='cursor-pointer hover:bg-[#E2E2E2]'>
                                        <td className="px-6 py-2">
                                            <div className="flex items-center">
                                                <div className="ml-8">
                                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">{asistencia.usuario.nombre}</div>
                                                    {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{asistencia.usuario.usuario}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{asistencia.horaDeEntrada}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4">
                                                <div className="text-sm font-medium text-gray-900">{asistencia.horaDeSalida}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4 flex items-center justify-center">
                                                <Image
                                                    src={asistencia.urlFoto}
                                                    zoomSrc={asistencia.urlFoto}
                                                    preview
                                                    pt={{
                                                        image: { className: 'w-15rem' },
                                                        toolbar: { style: { padding: '5rem' } },
                                                    }}
                                                    width='40'
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex space-x-4 items-center justify-center">
                                                <button
                                                    onClick={(event) => {
                                                        const inputString =  asistencia.coordenadasFoto;

                                                        // Buscar el índice del primer paréntesis
                                                        const startIndex = inputString.indexOf('(');

                                                        // Buscar el índice de la coma que separa los números
                                                        const commaIndex = inputString.indexOf(',');

                                                        // Buscar el índice del último paréntesis
                                                        const endIndex = inputString.indexOf(')');

                                                        // Extraer los números de la cadena original usando los índices encontrados
                                                        const latitude = inputString.substring(startIndex + 1, commaIndex).trim();
                                                        const longitude = inputString.substring(commaIndex + 1, endIndex).trim();

                                                        window.open(`https://maps.google.com/?q=${latitude},${longitude}`, '_blank')
                                                    }
                                                    }
                                                    className="w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                                                    <i className="pi pi-map-marker" style={{ fontSize: '1.5rem' }}></i>
                                                </button>
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
                                    value={rowsPerPageA}
                                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                            <h1 className='text-[#245A95] font-bold text-lg'>
                                Total de asistencias:
                                <span className='text-gray-700'> {totalRowsA}</span>
                            </h1>
                            <div className="flex items-center pl-4">
                                <span className="mr-2 text-[#245A95] font-bold text-lg">
                                    Página <span className='text-gray-700'>{currentPageA}</span> de <span className='text-gray-700'>{totalPagesA}</span>
                                </span>
                                <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                                    <button
                                        onClick={() => paginate(currentPageA - 1)}
                                        disabled={currentPageA === 1}
                                        className={`px-3 py-1 rounded-l-md focus:outline-none ${currentPageA === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
                                            }`}
                                    >
                                        <div className='text-[#245A95] hover:text-white'>
                                            <ion-icon name="caret-back-circle"></ion-icon>
                                        </div>
                                    </button>
                                    <span className="px-3 py-1 bg-gray-300 text-gray-700">{currentPageA}</span>
                                    <button
                                        onClick={() => paginate(currentPageA + 1)}
                                        disabled={indexOfLastRowA >= totalRowsA}
                                        className={`px-3 py-1 rounded-r-md focus:outline-none ${indexOfLastRowA >= totalRowsA ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
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
            </Dialog>
        </>
    )
}
