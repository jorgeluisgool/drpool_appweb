import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { CrearAlbercaForm } from './CrearAlbercaForm';

export const AlbercasSeccion = () => {

    const [modalAlberca, setModalAlberca] = useState(false);
    const [albercaSeleccionada, setAlbercaSeleccionada] = useState([])

  return (
    <>
    <h1 className="text-2xl font-bold text-[#245A95] pb-4">Dar de alta una alberca</h1>
        <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
            <div 
                className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                onClick={() => {setAlbercaSeleccionada(undefined), setModalAlberca(true)}}
            >
                <div className="px-6 py-2 bg-[#E2E2E2]">
                  <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVA ALBERCA</div>
                </div>
                <div className="grid place-items-center" style={{ height: '100px' }}>
                  <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i>
                </div>
            </div> 
            <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
                <span className='p-float-label relative py-4 '>
                    <InputText
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        name="direccion"
                        // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Busca la sede
                    </label>
                </span>
            </div>
        </div>
        {/* TABLA ALBERCAS */}
        {/* <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#245A95] text-white uppercase">
            <tr className='text-left'>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Sede</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Dirección</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Encargado</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
              <div className="items-center">
                  <span>Teléfono</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
              <div className="items-center">
                  <span>e-mail</span>
                </div>
              </th>
            
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" >
            {currentRows.map((sede, index) => (
              <tr
                onClick={() => {
                  setSedeSeleccionada(sede),
                  setDialogNuevaSedeForm(true)
                }} 
                key={index}
                className='cursor-pointer hover:bg-[#E2E2E2]'
              >
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{sede.nombre}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{sede.direccion}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{sede.encargado}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{sede.telefono}</div>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{sede.correo}</div>
                  </div>
                </td>  
              </tr>
            ))} 
          </tbody>
        </table> */}
        {/* PAGINATOR  */}
        {/* <div className="flex items-center justify-between mt-4 mb-6">
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
        </div> */}

        {/* MODAL DEL FORMULARIO DE CREACIO DE ALBERCA */}
        <CrearAlbercaForm modalAlberca={modalAlberca} setModalAlberca={setModalAlberca}/>
    </>
    
  )
}
