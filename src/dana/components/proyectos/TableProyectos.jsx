import React, { useEffect, useState } from 'react'
import { api } from '../../helpers/variablesGlobales';

export const TableProyectos = ({proyectoAlbercaSeleccionado, proyectoAlbercaData, setProyectoAlbercaSeleccionado, setModalCrearEditarProyectos, modalRegistroGuardado, filterProyectos, setSedeSelect}) => {

      //Estados y logica para que funcione el paginator
      const [currentPage, setCurrentPage] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(10);
    
      const totalRows = proyectoAlbercaData.length;
      const totalPages = Math.ceil(totalRows / rowsPerPage);
    
      // Obtener índice del último registro en la página actual
      const indexOfLastRow = currentPage * rowsPerPage;
      // Obtener índice del primer registro en la página actual
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      // Obtener los registros para la página actual
      const currentRows = filterProyectos.slice(indexOfFirstRow, indexOfLastRow);
    
      // Función para cambiar de página
      const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[#245A95] text-white uppercase">
                <tr className='text-left'>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center pl-12">
                            <span>Id proyecto</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center pl-12">
                            <span>Nombre proyecto</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Cliente al que pertenece</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Sede</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Alberca</span>
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
                {currentRows.map((proyectoAlberca, index) => (
                    <tr
                        key={index}
                        onClick={() => {
                            setProyectoAlbercaSeleccionado(proyectoAlberca);
                            setModalCrearEditarProyectos(true);
                        }}
                        className='cursor-pointer hover:bg-[#E2E2E2]'
                    >
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{proyectoAlberca.idproyectoalberca}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">    
                                <div className="text-sm font-medium text-gray-900 cursor-pointer">{proyectoAlberca.nombreproyectoalberca}</div>                               
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{proyectoAlberca.alberca.sede.cliente.cliente}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{proyectoAlberca.alberca.sede.nombre}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{proyectoAlberca.alberca.nombrealberca}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                {
                                    proyectoAlberca.estatus === 'VIGENTE'?
                                    <div className="text-sm font-medium text-green-600"><ion-icon name="radio-button-on-outline"></ion-icon> {proyectoAlberca.estatus}</div>
                                    :
                                    <div className="text-sm font-medium text-red-600"><ion-icon name="radio-button-off-outline"></ion-icon> {proyectoAlberca.estatus}</div>
                                }
                                <div className="text-sm font-medium text-gray-900">{}</div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

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
  )
}
