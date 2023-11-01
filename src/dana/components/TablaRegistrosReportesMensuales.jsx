import React, { useState } from 'react'
import { ReporteMensualFormEdit } from './ReporteMensualFormEdit';

export const TablaRegistrosReportesMensuales = ({reportesMensuales, albercaSeleccionada, rfm, setRfm, modalReporteMensualEdit, setModalReporteMensualEdit, searchRFM}) => {

  

    const reportesFiltradosPorAlberca = reportesMensuales.filter((reporte) => (
        reporte.ALBERCA.nombrealberca === albercaSeleccionada.nombrealberca
    ));

    const handleButtonClick = (event, reporte) => {
        event.preventDefault();
    
        // Reemplaza 'reporte.URLPDF' con la URL real de tu PDF.
        const urlPDF = reporte.URLPDF;
    
        // Abre una nueva ventana o pestaña del navegador con el PDF.
        window.open(urlPDF, '_blank');
      };

      const handleRowClick = (event, reporte) =>{
        setRfm(reporte);
        console.log("Clicked on reporte:", JSON.stringify(reporte, null, 2));
       
      }

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalRows = reportesFiltradosPorAlberca?.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Obtener índice del último registro en la página actual
    const indexOfLastRow = currentPage * rowsPerPage;
    // Obtener índice del primer registro en la página actual
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    // Obtener los registros para la página actual
    const currentRows = reportesFiltradosPorAlberca?.slice(indexOfFirstRow, indexOfLastRow) || [];

    console.log(currentRows)
    const currentRows2 = currentRows?.filter((registroRows) => (registroRows.FOLIO?.toLowerCase().includes(searchRFM.toLowerCase()) || registroRows.FECHA?.toLowerCase().includes(searchRFM.toLowerCase())));
      
    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#245A95] text-white uppercase">
            <tr className='text-left'>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center pl-12">
                  <span>Folio</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center pl-12">
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
                  <span>Fecha de Creacion</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
              <div className="items-center">
                  <span>PDF</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" >
            {currentRows2.map((reporte, index) => (
              <tr 
                key={index} 
                className='cursor-pointer hover:bg-[#E2E2E2]'
                onClick={(event) =>{ handleRowClick(event, reporte);
                  setModalReporteMensualEdit(true);
                }}
              >
                <td className="px-6">
                  <div className="flex items-center"> 
                    <div className="ml-8">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer">{reporte.FOLIO}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex items-center"> 
                    <div className="ml-8">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer">{reporte.SEDE.nombre}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{reporte.ALBERCA.nombrealberca}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{reporte.FECHA}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                    <button 
                      onClick={(event) => handleButtonClick(event, reporte)}
                      className="w-11 h-11 object-cover active:scale-[.98] py-1 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                      <i className="pi pi-file-pdf" style={{ fontSize: '1.5rem' }}></i>
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
