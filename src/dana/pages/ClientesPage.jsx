import React, { useEffect, useState } from 'react'
import { CrearClienteForm } from '../components/CrearClienteForm'
import useAuth from '../hooks/useAuth';
import { api } from '../helpers/variablesGlobales';
import { Link } from 'react-router-dom';
import { CrearSedeForm } from '../components/CrearSedeForm';
import { InputText } from 'primereact/inputtext';
import { EditarClienteSeleccionadoForm } from '../components/EditarClienteSeleccionadoForm';
import { Player } from '@lottiefiles/react-lottie-player';
import { DialogRegistroGuardado } from '../../ui/components/DialogRegistroGuardado';
import { AlbercasSeccion } from '../components/AlbercasSeccion';
import ModalClientesInactivos from '../components/ModalClientesInactivos';
import { VentanaCarga } from '../../ui/components/VentanaCarga';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { Skeleton } from 'primereact/skeleton';
import { SkeletonTabla } from '../components/SkeletonTabla';
import { SkeletonTable } from '../components/SkeletonTable';

export const ClientesPage = () => {

    const { userAuth, setUserAuth, setClienteSeleccionado } = useAuth();


    const[urlImage, setUrlImage] = useState("")
    const [clientes, setClientes] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [dialogNuevoClienteForm, setDialogNuevoClienteForm ] = useState(false);
    const [dialogEditatarClienteForm, setDialogEditatarClienteForm ] = useState(false);
    const [dialogNuevaSedeForm, setDialogNuevaSedeForm] = useState(false);
    const [ventanaCarga, setVentanaCarga] = useState(false);
    const [ventanaConfirmacion, setVentanaConfirmacion] = useState(false);
    const [clienteState, setClienteState] = useState([]);
    const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false);
    const [sedeSeleccionada, setSedeSeleccionada] = useState();
    const [respuestaApiCliente, setRespuestaApiCliente] = useState();
    const [dialogClientesInactivos, setDialogClientesInactivos] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSede, setSearchSede] = useState('');
    const [searchAlberca, setSearchAlberca] = useState('');

    const [uploadedImage, setUploadedImage] = useState(null);
    const [file, setFile] = useState(null);
    
    // obtener la lista de iusuarios
    const { data: listaUsuarios, loading: loadingUsuarios } = useFetchUsers();
    

    const handleSearchClientes = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearchSede = (event) => {
      setSearchSede(event.target.value);
    };

    const handleSearchAlberca = (event) => {
      setSearchAlberca(event.target.value);
    };

    //Clientes filtrados para Search 
    const filterClientes = clientes.filter((cliente) =>
      cliente.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filterSedes = sedes?? sedes.filter((sede) =>
      sede.nombre.toLowerCase().includes(searchSede.toLowerCase()) || 
      sede.encargadosede.toLowerCase().includes(searchSede.toLowerCase())
    );

    
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
    }, [dialogEditatarClienteForm, uploadedImage]);

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
  }, [dialogNuevaSedeForm, uploadedImage, setVentanaCarga]);
  
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${api}/obtener/sedes`);
  //       const jsonData = await response.json();
  //       setSedes(jsonData);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dialogNuevaSedeForm, uploadedImage, setVentanaCarga]);

  // Estados y logica para que funcione el paginator
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRows = filterSedes.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRows = filterSedes?? filterSedes.slice(indexOfFirstRow, indexOfLastRow);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const converImageUrlToFile =async (imageUrl) =>{
    
    if (imageUrl != '') {
      try {
        const response = await fetch(`/proxy?url=${encodeURIComponent(imageUrl)}`);
        console.log(response)
        const blob = await response.blob();
  
        const filename = 'imagen'
        const file = new File([blob], filename, {type: blob.type});
        setFile(file);
        setUploadedImage(imageUrl);
      }catch (error) {
        console.log(error)
      }
    }  
  }

  const clientesActivos = filterClientes.filter(cliente => cliente.estatus === "ACTIVO");

  // funcion que hace que al hacer refesh se mantenga el usuario activo
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserAuth(foundUser);
    }
  }, []);
  
  return (
    <>
      {ventanaCarga && (
        <VentanaCarga/>
      )}

      <DialogRegistroGuardado setModalRegistroGuardado={setModalRegistroGuardado} modalRegistroGuardado={modalRegistroGuardado}/>
      <div className="py-8">
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">ALTAS CLIENTES, SEDES Y ALBERCAS </h1>
        {/* CLIENTES */}
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-12'>
        <h1 className="text-2xl font-bold text-[#245A95] pb-4">ALTA DE CLIENTE</h1>
          <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8'>
            {
              userAuth[0]?.perfile.perfil === 'SUBDIRECTOR' ? 
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
              : <></>
            }
            <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
              <div className="flex flex-col">
                <span className='p-float-label relative'>
                    <InputText
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        name="direccion"
                        type='text'
                        value={searchTerm.toUpperCase()}
                        onChange={handleSearchClientes}  
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Busca el cliente
                    </label>
                </span>
                <p className="text-base text-[#245A95] font-semibold">Puedes buscar al cliente por su nombre</p>
              </div>
            </div> 
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
              onClick={()=>{
                setDialogClientesInactivos(true);
              }}
            >
              <ion-icon name="eye" className="mr-2 text-2xl"></ion-icon> Clientes inactivos
            </button>
          </div>
          {/* SECCION DE TARJETAS DE CLIENTES */}
          {
            !clientesActivos || clientesActivos.length === 0 ?  
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 animate-pulse'> 
                <div className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="px-2 py-3 bg-[#E2E2E2] text-center">
                      <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]"></div>
                    </div>
                    <div className="relative" style={{ height: '100px' }}>
                      
                        <div className="flex items-center justify-center absolute inset-0 w-full h-full text-[#245A95] font-bold text-3xl">
                          
                        </div>
                      
                    </div>
                  </div>  
            </div>
            :
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4'> 
            {
              clientesActivos.map((cliente, index) => (
                <Link 
                  key={index} 
                  onClick={() => {
                    setClienteState(cliente), 
                    setDialogEditatarClienteForm(true), 
                    converImageUrlToFile(cliente.urllogo)}}
                  >
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
          }
        </div>

        {/* SEDES */}
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-12'>
            <h1 className="text-2xl font-bold text-[#245A95] pb-4">ALTA DE SEDE</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
              <div 
                  className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                  onClick={() => {setSedeSeleccionada(undefined), setDialogNuevaSedeForm(true)}}
              >
                <div className="px-6 py-2 bg-[#E2E2E2]">
                  <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVA SEDE</div>
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
                          value={searchSede.toUpperCase()}
                          onChange={handleSearchSede} 
                      /> 
                      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                        <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                      </span>
                      <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Busca la sede
                      </label>
                  </span>
                  <p className="text-base text-[#245A95] font-semibold">Puedes buscar la sede por su nombre, o por el administrador de la sede</p>
                </div>
              </div>
            </div>
            {
              !currentRows || currentRows.length === 0 ?  
              <SkeletonTable/>
              :
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
                      <span>Administrador de la sede</span>
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
                  <th scope="col" className="relative px-6 py-3">
                  <div className="items-center">
                      <span>Cliente</span>
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
                {currentRows.length >0 ?
                currentRows.map((sede, index) => (
                  <tr
                    onClick={() => {
                      setSedeSeleccionada(sede)
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
                      <div className="text-sm font-medium text-gray-900">{sede.direccion.calle}</div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                      <div className="text-sm font-medium text-gray-900">{sede.encargadosede}</div>
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
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                      <div className="text-sm font-medium text-gray-900">{sede.cliente.cliente}</div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        {
                            sede.estatus === 'ACTIVO'?
                            <div className="text-sm font-medium text-green-600"><ion-icon name="radio-button-on-outline"></ion-icon> {sede.estatus}</div>
                            :
                            <div className="text-sm font-medium text-red-600"><ion-icon name="radio-button-off-outline"></ion-icon> {sede.estatus}</div>
                        }
                      </div>
                    </td>
                  </tr>
                )):
                <></>
                } 
              </tbody>
            </table>
            }
            
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
            
        </div>

        {/* ALBERCAS SECCION*/}
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
          <AlbercasSeccion 
            sedes={sedes}
            ventanaCarga={ventanaCarga}
            setVentanaCarga={setVentanaCarga}
            modalRegistroGuardado={modalRegistroGuardado}
            setModalRegistroGuardado={setModalRegistroGuardado}
            clientesActivos={clientesActivos}
            searchAlberca={searchAlberca}
            setSearchAlberca={setSearchAlberca}
            handleSearchAlberca={handleSearchAlberca}
          />
        </div>
        </div>
        {/* Modales de formularios */}
        <CrearClienteForm 
          dialogNuevoClienteForm={dialogNuevoClienteForm} 
          setDialogNuevoClienteForm={setDialogNuevoClienteForm} 
          setVentanaCarga={setVentanaCarga} 
          setVentanaConfirmacion={setVentanaConfirmacion}
          setModalRegistroGuardado={setModalRegistroGuardado}
        />
        <EditarClienteSeleccionadoForm 
          clienteState={clienteState} 
          dialogEditatarClienteForm={dialogEditatarClienteForm} 
          setDialogEditatarClienteForm={setDialogEditatarClienteForm}
          setVentanaCarga={setVentanaCarga}
          setVentanaConfirmacion={setVentanaConfirmacion}
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
          setFile={setFile}
          file={file}
          setRespuestaApiCliente={setRespuestaApiCliente}
        />
        
        <CrearSedeForm 
          dialogNuevaSedeForm={dialogNuevaSedeForm} 
          setDialogNuevaSedeForm={setDialogNuevaSedeForm}
          setVentanaCarga={setVentanaCarga}
          setModalRegistroGuardado={setModalRegistroGuardado}
          setSedeSeleccionada={setSedeSeleccionada}
          sedeSeleccionada={sedeSeleccionada}
          clientes={clientes}
          listaUsuarios={listaUsuarios}
          sedes={sedes}
        />
        <ModalClientesInactivos
          dialogClientesInactivos={dialogClientesInactivos}
          setDialogClientesInactivos={setDialogClientesInactivos}
          clientes={clientes}
          setDialogEditatarClienteForm={setDialogEditatarClienteForm}
          converImageUrlToFile={converImageUrlToFile}
          setClienteState={setClienteState}
        />
    </>
  )
}








