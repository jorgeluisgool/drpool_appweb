import React, { useEffect, useState } from 'react'
import { CrearClienteForm } from '../components/CrearClienteForm'
import useAuth from '../hooks/useAuth';
import { api } from '../helpers/variablesGlobales';
import { Link } from 'react-router-dom';
import { CrearSedeForm } from '../components/CrearSedeForm';

export const ClientesPage = () => {

    const { userAuth, setUserAuth, setClienteSeleccionado } = useAuth();

    const [clientes, setClientes] = useState([]);
    const [dialogNuevoClienteForm, setDialogNuevoClienteForm ] = useState(false);
    const [dialogNuevaSedeForm, setDialogNuevaSedeForm] = useState(false);
    

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
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">ALTAS</h1>
        {/* CLIENTES */}
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <h1 className="text-2xl font-bold text-[#245A95] pb-4">Dar de alta un cliente</h1>
          <div className='grid grid-cols-3 xl:grid-cols-6 gap-8 m-4'>
            <div 
                className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                onClick={() => setDialogNuevoClienteForm(true)}
            >
              <div className="px-6 py-2 bg-[#E2E2E2]">
                <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVO CLIENTE</div>
              </div>
              <div className="grid place-items-center" style={{ height: '100px' }}>
                <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i>
              </div>

            </div>
            {
              clientes.map((cliente, index) => (
                <Link key={index} to='/registropage' onClick={() => setClienteSeleccionado(cliente)}>
                  <div className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="px-6 py-2 bg-[#E2E2E2]">
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
            <div className='grid grid-cols-3 xl:grid-cols-6 gap-8 m-4'>
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
              
            </div>
        </div>

        {/* Modales de formularios */}
        <CrearClienteForm dialogNuevoClienteForm={dialogNuevoClienteForm} setDialogNuevoClienteForm={setDialogNuevoClienteForm}/>
        <CrearSedeForm dialogNuevaSedeForm={dialogNuevaSedeForm} setDialogNuevaSedeForm={setDialogNuevaSedeForm}/>
    </>
  )
}
