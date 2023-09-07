import { Field } from 'formik'
import { InputText } from 'primereact/inputtext';
import React from 'react'
import { ClienteConfiguracionForm } from '../components/clienteConfiguracion/ClienteConfiguracionForm';

export const ClienteConfiguracionPage = () => {
  return (
    <>
        <div className="py-8">
            <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">CONFIGURACIÓN</h1>
            <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-4'>
            <h1 className="text-2xl font-bold text-[#245A95] pb-4">PERFIL DE LA EMPRESA</h1>

            {/* <div className=" mb-6 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl     relative w-full max-w-md rounded overflow-hidden shadow-lg bg-white">
              <div className="relative flex items-center justify-center h-64 overflow-hidden bg-[#E2E2E2]">
                <img className="absolute inset-0 w-full h-full object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-90" src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62" alt="Random image" />
                <div className=" inset-0 bg-black opacity-50"></div>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut aliquam nisi, vel venenatis nulla. Maecenas gravida lacus vel elit iaculis dignissim. Nullam malesuada elit ut neque dictum tempor. Curabitur sit amet lacus auctor, luctus mauris id, eleifend ipsum.</p>
                <a href="#" className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">Editar</a>
              </div>
            </div> */}


          <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3'>
            <div className="mb-6 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group">
                <div className="relative flex items-center justify-center h-64 overflow-hidden bg-[#E2E2E2] group-hover:opacity-50 group-hover:scale-90 transition duration-300 ease-in-out cursor-pointer">
                    <img className="absolute inset-0 w-full h-full object-contain" src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62" alt="Random image" />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-75">
                        <svg className="w-10 h-10 text-black hover:text-slate-800 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15.57 3.43a4 4 0 00-5.66 0L2 10.34V18h7.66l6.93-6.93a4 4 0 000-5.66z"></path>
                        </svg>
                    </div>
                </div>
                <div className="p-6 bg-white">
                    <p className="text-black font-bold text-base">Nombre de la empresa: <span className='text-gray-600'>DR POOL </span></p>
                    <p className="text-black font-bold text-base">Teléfono de contacto: <span className='text-gray-600'>5512345623 </span></p>
                    <p className="text-black font-bold text-base">Correo electrónico de contacto: <span className='text-gray-600'>5512345623 </span></p>
                    <p className="text-black font-bold text-base">Domicilio de las oficinas: <span className='text-gray-600'>5512345623 </span></p>
                    <p className="text-black font-bold text-base">RFC de la empresa: <span className='text-gray-600'>5512345623 </span></p>
                    <p className="text-black font-bold text-base">Giro comercial: <span className='text-gray-600'>5512345623 </span></p>
                    <div className=" cursor-pointer inset-x-0 bottom-4 flex gap-3 justify-center pt-3">
                        <button
                            className="hover:shadow-slate-600 border w-full h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"

                            type='button'
                        >
                            editar
                        </button>
                    </div>
                </div>
            </div>
            <div className='mb-6 col-span-2 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group'>
                <ClienteConfiguracionForm/>
            </div>

          </div>
          

            </div>
        </div>
    </>
  )
}
