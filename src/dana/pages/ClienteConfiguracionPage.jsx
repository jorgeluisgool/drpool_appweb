import { Field } from 'formik'
import { InputText } from 'primereact/inputtext';
import React, { useEffect } from 'react'
import { ClienteConfiguracionForm } from '../components/clienteConfiguracion/ClienteConfiguracionForm';
import useAuth from '../hooks/useAuth';

export const ClienteConfiguracionPage = () => {

  const { setUserAuth } = useAuth();

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
        <div className="py-8">
            <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">CONFIGURACIÓN</h1>
            <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-4'>
            <h1 className="text-2xl font-bold text-[#245A95] pb-4">PERFIL DE LA EMPRESA</h1>
              <div className='pt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1'>
                <div className="mb-6 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group">
                    <div className="relative flex items-center justify-center h-64 overflow-hidden group-hover:opacity-50 group-hover:scale-90 transition duration-300 ease-in-out cursor-pointer">
                        <img className="absolute inset-0 w-full h-full object-contain" src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62" alt="Random image" />
                        {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}
                    </div>
                    <div className="p-6 bg-white">
                        <p className="text-black font-bold text-base">Nombre de la empresa: <span className='text-gray-600'>Dr Pool Don't Worry Water</span></p>
                        <p className="text-black font-bold text-base">Teléfono de contacto: <span className='text-gray-600'>(55) 8525 4747 </span></p>
                        <p className="text-black font-bold text-base">Correo electrónico de contacto: <span className='text-gray-600'>ventas@drpool.mx </span></p>
                        <p className="text-black font-bold text-base">Domicilio de las oficinas: <span className='text-gray-600'>San Francisco #1525, Tlacoquemecatl, Benito Juárez, CDMX, CP. 03200 </span></p>
                        <p className="text-black font-bold text-base">RFC de la empresa: <span className='text-gray-600'>DPO1907195W1 </span></p>
                        <p className="text-black font-bold text-base">Giro comercial: <span className='text-gray-600'>de Servicios </span></p>
                        {/* <div className=" cursor-pointer inset-x-0 bottom-4 flex gap-3 justify-center pt-3">
                            <button
                                className="hover:shadow-slate-600 border w-full h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                type='button'
                            >
                                editar
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* <div className='mb-6 col-span-2 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group'>
                    <ClienteConfiguracionForm/>
                </div> */}
              </div>
            </div>
        </div>
    </>
  )
}
