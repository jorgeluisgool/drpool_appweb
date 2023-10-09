import React, { useEffect, useState } from 'react'
import { api } from '../helpers/variablesGlobales';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

export const ClientesRegistrosPage = () => {

  const { userAuth, setUserAuth, setClienteSeleccionado,  } = useAuth();

  const [clientes, setClientes] = useState([]);
  const [searchCliente, setSearchCliente] = useState('');

  const handleSearchCliente = (event) => {
    setSearchCliente(event.target.value);
  };

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

    //  FILTRAR LOS CLIENTES ACTIVOS
    const clientesActivos = clientes.filter((cliente) => 
     cliente.estatus === 'ACTIVO'
    );

     //Clientes filtrados para Search 
    const filterClientes = clientesActivos.filter((cliente) =>
    cliente.cliente.toLowerCase().includes(searchCliente.toLowerCase())
    );

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
      <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Clientes</h1>
      <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
      <h1 className="text-2xl font-bold text-[#245A95] pb-2">Selecciona un cliente para poder ver sus registros como bitacoras diarias, reportes semanales, y mensuales</h1>
      <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
          <div className="flex flex-col">
            <span className='p-float-label relative'>
                <InputText
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    name="direccion"
                    value={searchCliente}
                    onChange={handleSearchCliente}
                /> 
                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                  <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                </span>
                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                  Busca el cliente
                </label>
            </span>
            <p className="text-base text-[#245A95] font-semibold">Puedes buscar el cliente por su nombre</p>
          </div>
        </div>
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-8 m-4'>
          {
            filterClientes.map((cliente, index) => (
              <Link key={index} to='/registros' onClick={() => setClienteSeleccionado(cliente)}>
                <div className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                  <div className="px-6 py-2 bg-[#E2E2E2]">
                    <div className="font-bold text-sm xl:text-2xl mb-2 text-[#245A95]">{cliente.cliente}</div>
                  </div>
                  <div className="relative" style={{ height: '200px' }}>
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

    </>
  )
}
