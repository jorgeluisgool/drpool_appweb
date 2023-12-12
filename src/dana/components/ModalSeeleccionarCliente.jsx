import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'
import { api } from '../helpers/variablesGlobales';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

export const ModalSeeleccionarCliente = ({modalSeleccionCliente, setModalSeleccionCliente}) => {

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
  }, [modalSeleccionCliente]);

   //  FILTRAR LOS CLIENTES ACTIVOS
   const clientesActivos = clientes.filter((cliente) => 
   cliente.estatus === 'ACTIVO' && cliente.idcliente != 2
  );

  console.log(clientesActivos)

   //Clientes filtrados para Search 
   const filterClientes = clientesActivos.filter((cliente) =>
   cliente.cliente.toLowerCase().includes(searchCliente.toLowerCase())
   );
    
  return (
    <Dialog header='Selecciona un cliente' visible={modalSeleccionCliente} style={{ width: '90vw'}} onHide={() => setModalSeleccionCliente(false)}>
      <div className='grid grid-cols-2 xl:mx-20'>
        <h1 className="pt-20 pl-3 text-4xl font-black text-[#245A95]">Clientes</h1>
        <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
          <div className="flex flex-col">
            <span className='p-float-label relative'>
                <InputText
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    name="direccion"
                    type='text'
                    value={searchCliente.toUpperCase()}
                    onChange={handleSearchCliente}  
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
      
      <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md border bg-white rounded-lg overflow-hidden'>
        
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-8 m-4'>
          {
            filterClientes.map((cliente, index) => (
              // <Link key={index} to='/registropage' onClick={() => setClienteSeleccionado(cliente)}>
                <div key={index} onClick={() => {setClienteSeleccionado(cliente), setModalSeleccionCliente(false)}} className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                  <div className="px-6 py-2 bg-[#E2E2E2]">
                    <div className="font-bold text-xs xl:text-base mb-2 text-[#245A95]">{cliente.cliente}</div>
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
              // </Link>
            ))
          }
        </div>
      </div>
    </Dialog>
  )
}
