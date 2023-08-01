import React, { useState } from 'react';
import { api } from '../helpers/variablesGlobales';

const TableRegistros = ({data, headers, onDelete, onEdit, selectedRows, isSelected, onSelectedRow, setModalAbrirCerrar, listaRegistros, setProyectoSeleccionado, setDataProyectoSeleccionado, usuariosSeleccionados}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [cargando, setCargando] = useState(false);

  const totalRows = listaRegistros.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRows = listaRegistros.slice(indexOfFirstRow, indexOfLastRow);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(usuariosSeleccionados[0].idusuario)

  return (
    <>
    {cargando && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center transition duration-500 ease-in-out">
            <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
              <img src="/src/assets/isae.png" alt="Icono" className="h-20 xl:h-40 mr-1 animate-spin"/>
            </span>
            <img src="/src/assets/letras_isae.png" alt="Icono" className="h-20 xl:h-40 mr-2" />
          </div>
          <div className='fixed pt-36 xl:pt-60'>
          <h1 className='text-[#C41420] text-4xl font-black animate-pulse'>Cargando...</h1>
          </div>
        </div>
      )}

    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
      <thead className="bg-[#245A95] text-white uppercase">
        <tr className='text-left'>
          <th scope="col" className="relative px-6 py-3">
            <input
              type="checkbox"
              className="absolute h-4 w-4 top-3 left-3"
              onChange={() => {}}
              // checked={selectedRows.length === data.length}
            />
            <div className="items-center pl-12">
              <span>Proyecto</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <div className="items-center">
              <span>Folio</span>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
          <div className="items-center">
              <span>Estatus</span>
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
          <th scope="col" className="relative px-6 py-3">
          <div className="items-center">
              <span>Evidencia</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200" >
        {currentRows.map((registro, index) => (
          <tr 
            key={index} 
            onClick={() => {
              setProyectoSeleccionado(registro);
              setCargando(true); // Mostrar ventana de carga
              
              fetch(`${api}/obtener/datoscompletos/registro/${registro.idinventario}/${registro.proyecto.idproyecto}/${usuariosSeleccionados[0] == null ? 0 : usuariosSeleccionados[0].idusuario }`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json' 
                },
              })
                .then(response => response.json())
                .then(responseData => {
                  setDataProyectoSeleccionado(responseData);
                  setCargando(false); // Ocultar ventana de carga
                  setModalAbrirCerrar(true);
                })
                .catch(error => {
                  console.log(error);
                  setCargando(false); // Ocultar ventana de carga en caso de error
                });
            }}
            
            className='cursor-pointer hover:bg-[#E2E2E2]'
          >
            <td className="px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-4 w-4">
                  <input
                    type="checkbox"
                    className=" top-3 left-3 p-2"
                    checked={isSelected(index)}
                    onChange={() => onSelectedRow(index)}
                  />
                </div>
                {/* <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.image}
                    alt=""
                  />
                </div> */}
                <div className="ml-8">
                  <div className="text-sm font-medium text-gray-900 cursor-pointer">{registro.proyecto.proyecto}</div>
                  {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                </div>
              </div>
            </td>
            <td className="px-6">
              <div className="flex space-x-4">
              <div className="text-sm font-medium text-gray-900">{registro.folio}</div>
              </div>
            </td>
            <td className="px-6">
              <div className="flex space-x-4">
              <div className="text-sm font-medium text-gray-900">{registro.estatus}</div>
              </div>
            </td>
            <td className="px-6">
              <div className="flex space-x-4">
              <div className="text-sm font-medium text-gray-900">{registro.fechacreacion}</div>
              </div>
            </td>
            <td className="px-6">
              <div className="flex space-x-4">
                <button 
                  onClick={ (event)=>{
                      if (registro.estatus==='CERRADO') {
                        event.stopPropagation();
                        // fetch(`${api}/abrir/documento/inventario/${registro.idinventario}`, {
                        //   method: 'GET',
                        //   headers: {
                        //     'Content-Type': 'application/json' 
                        //   },
                        //   // body: JSON.stringify(usuario.target.value) 
                        // })
                        //   .then(response => console.log(response.blob))
                        //   .catch(error => console.log(error));
                        window.open(`${api}/abrir/documento/inventario/${registro.idinventario}`,'_blank')
                      }
                    }
                  }
                  className="w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                  <i className="pi pi-file-pdf" style={{ fontSize: '1.5rem' }}></i>
                </button>
              </div>
            </td>
            <td className="px-6">
              <div className="flex space-x-4">        
              <button
                type="submit"
                onClick={() => { setModalAbrirCerrar(true)}}
                className="w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                <ion-icon name="document-attach"></ion-icon>
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
    
  );
}

export default TableRegistros;