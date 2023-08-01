import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { useFetchHistorialCambios } from '../hooks/useFetchHistorialCambios';

export const ModalHistorialRegistros = ({modalHistorialAbrirCerrar, setModalHistorialAbrirCerrar, proyectoSeleccionado, handleReset}) => {

  const { data: historialCambiosData } = useFetchHistorialCambios(proyectoSeleccionado, modalHistorialAbrirCerrar);

  // Invierte los registros antes de utilizarlos para el cálculo de las páginas y registros actuales
  const historialCambiosDataReversed = [...historialCambiosData].reverse();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRows = historialCambiosData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRows = historialCambiosDataReversed.slice(indexOfFirstRow, indexOfLastRow);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Dialog header='Historial de cambios' visible={modalHistorialAbrirCerrar} style={{ width: '90vw', height: '40vw' }} onHide={() => setModalHistorialAbrirCerrar(false)} className='mt-16'>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md mb-6">
      <thead className="bg-[#245A95] text-white uppercase">
        <tr className='text-left'>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Campo</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Usuario</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Anterior</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Nuevo</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Fecha_cambio</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Hora</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Restablecer</span>
            </div>
          </th>  
        </tr>
      </thead>
        <tbody className="divide-y divide-gray-200" >
          {
            currentRows.map((historialCambio, index) =>(
              <tr 
                key={index} 
                className='hover:bg-[#E2E2E2]'
              >
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.campo.campo}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.usuario.usuario}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.valoranterior}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.valornuevo}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.fechacambio}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{historialCambio.horacambio}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                    <div className="text-sm font-medium text-gray-900 mx-auto p-1">
                      <button
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95] ml-auto"
                        onClick={() => handleReset(historialCambio)}
                      >
                        <i className="pi pi-refresh"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
          
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
    </Dialog>
    </>
  )
}
