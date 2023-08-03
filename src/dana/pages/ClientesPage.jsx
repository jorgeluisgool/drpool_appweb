import React, { useEffect, useState } from 'react'
import { CrearClienteForm } from '../components/CrearClienteForm'
import useAuth from '../hooks/useAuth';
import { api } from '../helpers/variablesGlobales';
import { Link } from 'react-router-dom';
import { CrearSedeForm } from '../components/CrearSedeForm';
import { InputText } from 'primereact/inputtext';

export const ClientesPage = () => {

    const { userAuth, setUserAuth, setClienteSeleccionado } = useAuth();

    const [clientes, setClientes] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [dialogNuevoClienteForm, setDialogNuevoClienteForm ] = useState(false);
    const [dialogNuevaSedeForm, setDialogNuevaSedeForm] = useState(false);
    const [cargando, setCargando] = useState(false);
    
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`${api}/obtener/clientes/usuario/${userAuth[0].clienteAplicacion.idcliente}`);
         const jsonData = await response.json();
         setClientes(jsonData);
       } catch (error) {
         console.log('Error:', error);
       }
     };

     fetchData();
   }, []);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/sedes`);
        const jsonData = await response.json();
        setSedes(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  // Estados y logica para que funcione el paginator
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRows = sedes.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRows = sedes.slice(indexOfFirstRow, indexOfLastRow);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">CLIENTES Y SEDES</h1>
        {/* CLIENTES */}
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-12'>
        <h1 className="text-2xl font-bold text-[#245A95] pb-4">Dar de alta un cliente</h1>
          <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
            <div 
                className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                onClick={() => setDialogNuevoClienteForm(true)}
            >
              <div className="px-2 py-1 bg-[#E2E2E2]">
                <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVO CLIENTE</div>
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
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Busca el cliente
                    </label>
                </span>
            </div> 
          </div>
          
          <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4'> 
            {
              clientes.map((cliente, index) => (
                <Link key={index} onClick={() => {setClienteSeleccionado(cliente), setDialogNuevoClienteForm(true)}}>
                  <div className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="px-2 py-1 bg-[#E2E2E2] text-center">
                      <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">{cliente.cliente}</div>
                    </div>
                    <div className="relative" style={{ height: '100px' }}>
                      {cliente.urllogo ? (
                        <img
                          className="absolute inset-0 w-full h-full object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75"
                          src={cliente.urllogo}
                          alt="Random image"
                        />
                      ) : (
                        <div className="flex items-center justify-center absolute inset-0 w-full h-full text-[#245A95] font-bold text-3xl">
                          {cliente.cliente}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>

        {/* CEDES */}
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
            <h1 className="text-2xl font-bold text-[#245A95] pb-4">Dar de alta una sede</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
              <div 
                  className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                  onClick={() => setDialogNuevaSedeForm(true)}
              >
                <div className="px-6 py-2 bg-[#E2E2E2]">
                  <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVA SEDE</div>
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
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Busca el cliente
                    </label>
                </span>
              </div>
            </div>

            <div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
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
                    
                    {/* <td className="px-6">
                      <div className="flex space-x-4">        
                      <button
                        type="submit"
                        // onClick={() => { setModalAbrirCerrar(true)}}
                        className="w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] my-1">
                        <ion-icon name="document-attach"></ion-icon>
                      </button>
                      </div>
                    </td> */}
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
            </div>
        </div>

        {/* Modales de formularios */}
        <CrearClienteForm dialogNuevoClienteForm={dialogNuevoClienteForm} setDialogNuevoClienteForm={setDialogNuevoClienteForm}/>
        <CrearSedeForm dialogNuevaSedeForm={dialogNuevaSedeForm} setDialogNuevaSedeForm={setDialogNuevaSedeForm}/>
    </>
  )
}
