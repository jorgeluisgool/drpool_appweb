import React, { useEffect, useState } from 'react'
import { api } from '../helpers/variablesGlobales';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const ClientesRegistrosPage = () => {

  const { userAuth, setUserAuth, setClienteSeleccionado } = useAuth();

  const [clientes, setClientes] = useState([]);

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

  return (
    <>
      <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Clientes</h1>
      <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <div className='grid grid-cols-2 xl:grid-cols-3 gap-8 m-4'>
          {
            clientes.map((cliente, index) => (
              <Link key={index} to='/registropage' onClick={() => setClienteSeleccionado(cliente)}>
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
