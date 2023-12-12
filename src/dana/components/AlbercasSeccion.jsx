import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { CrearAlbercaForm } from './CrearAlbercaForm';
import { api } from '../helpers/variablesGlobales';
import { SkeletonTable } from './SkeletonTable';

export const AlbercasSeccion = ({sedes, ventanaCarga, setVentanaCarga, modalRegistroGuardado, setModalRegistroGuardado, clientesActivos, searchAlberca, setSearchAlberca, handleSearchAlberca}) => {

    const [modalAlberca, setModalAlberca] = useState(false);
    const [albercas, setAlbercas] = useState([]);
    const [albercaSeleccionada, setAlbercaSeleccionada] = useState([]);
    const [clienteSelect, setClienteSelect] = useState('');

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
    }, [modalRegistroGuardado]);


    console.log(albercas)
    const filterAlbercas = albercas.filter((alberca) =>
      alberca.idalberca !== 13 && (
        alberca.nombrealberca.toLowerCase().includes(searchAlberca.toLowerCase())
      )
    );

    // Estados y logica para que funcione el paginator
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalRows = filterAlbercas.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
  
    // Obtener índice del último registro en la página actual
    const indexOfLastRow = currentPage * rowsPerPage;
    // Obtener índice del primer registro en la página actual
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    // Obtener los registros para la página actual
    const currentRows = filterAlbercas.slice(indexOfFirstRow, indexOfLastRow);
  
    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <h1 className="text-2xl font-bold text-[#245A95] pb-4">ALTA DE ALBERCA</h1>
        <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
            <div 
                className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                onClick={() => {setAlbercaSeleccionada(undefined), setModalAlberca(true), setClienteSelect('')}}
            >
                <div className="px-6 py-2 bg-[#E2E2E2]">
                  <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVA ALBERCA</div>
                </div>
                <div className="grid place-items-center" style={{ height: '100px' }}>
                  <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i>
                </div>
            </div> 
            <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
                <div className="flex flex-col">
                  <span className='p-float-label relative'>
                      <InputText
                          className="w-full appearance-none focus:outline-none bg-transparent"
                          name="direccion"
                          value={searchAlberca.toUpperCase()}
                          onChange={handleSearchAlberca}
                      /> 
                      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                        <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                      </span>
                      <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Busca la alberca
                      </label>
                  </span>
                  <p className="text-base text-[#245A95] font-semibold">Puedes buscar la alberca por su nombre</p>
                </div>
            </div>
        </div>
        {/* TABLA ALBERCAS */}
        {
          !currentRows || currentRows.length === 0 ?  
          <SkeletonTable/>
          : 
          <>
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#245A95] text-white uppercase">
            <tr className='text-left'>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Nombre alberca</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Tipo de alberca</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Capacidad (L)</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
              <div className="items-center">
                  <span>Sede</span>
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
            {currentRows.map((alberca, index) => (
              <tr
                onClick={() => {
                  setAlbercaSeleccionada(alberca),
                  setModalAlberca(true)
                  setClienteSelect(alberca.sede.cliente)
                }} 
                key={index}
                className='cursor-pointer hover:bg-[#E2E2E2]'
              >
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{alberca.nombrealberca}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{alberca.tipoalberca}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{alberca.capacidad}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{alberca.sede.nombre}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                    {
                        alberca.estatus === 'ACTIVO'?
                        <div className="text-sm font-medium text-green-600"><ion-icon name="radio-button-on-outline"></ion-icon> {alberca.estatus}</div>
                        :
                        <div className="text-sm font-medium text-red-600"><ion-icon name="radio-button-off-outline"></ion-icon> {alberca.estatus}</div>
                    }
                  </div>
                </td>     
              </tr>
            ))} 
          </tbody>
        </table>
        {/* PAGINATOR  */}
        <div className="flex items-center justify-between mt-4 mb-6">
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
                  className={`px-3 py-1 rounded-l-md focus:outline-none ${
                    currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
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
                  className={`px-3 py-1 rounded-r-md focus:outline-none ${
                    indexOfLastRow >= totalRows ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
                  }`}
                >
                  <div className='text-[#245A95] hover:text-white'>
                  <ion-icon name="caret-forward-circle"></ion-icon>
                  </div>
                </button>
              </nav>
            </div>
        </div> 
          </>        
        }
        

        {/* MODAL DEL FORMULARIO DE CREACIO DE ALBERCA */}
        <CrearAlbercaForm 
          modalAlberca={modalAlberca} 
          setModalAlberca={setModalAlberca}
          sedes={sedes}
          albercaSeleccionada={albercaSeleccionada}
          ventanaCarga={ventanaCarga}
          setVentanaCarga={setVentanaCarga}
          setModalRegistroGuardado={setModalRegistroGuardado}
          clientesActivos={clientesActivos}
          clienteSelect={clienteSelect}
          setClienteSelect={setClienteSelect}
        />
    </>
    
  )
}
