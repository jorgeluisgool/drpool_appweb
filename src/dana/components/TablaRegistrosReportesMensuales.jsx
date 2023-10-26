import React from 'react'

export const TablaRegistrosReportesMensuales = ({reportesMensuales, albercaSeleccionada}) => {

    const reportesFiltradosPorAlberca = reportesMensuales.filter((reporte) => (
        reporte.ALBERCA.nombrealberca === albercaSeleccionada.nombrealberca
    ));

    console.log(reportesFiltradosPorAlberca);
    const handleButtonClick = (event, reporte) => {
        event.preventDefault();
    
        // Reemplaza 'reporte.URLPDF' con la URL real de tu PDF.
        const urlPDF = reporte.URLPDF;
    
        // Abre una nueva ventana o pestaña del navegador con el PDF.
        window.open(urlPDF, '_blank');
      };

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
            {reportesFiltradosPorAlberca.map((reporte, index) => (
              <tr 
                key={index} 
                className='cursor-pointer hover:bg-[#E2E2E2]'
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
    </>
  )
}
