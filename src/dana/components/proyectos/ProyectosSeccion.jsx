import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { TableProyectos } from './TableProyectos'
import { FormProyectos } from './FormProyectos'
import { DialogRegistroGuardado } from '../../../ui/components/DialogRegistroGuardado'
import { Player } from '@lottiefiles/react-lottie-player'

export const ProyectosSeccion = () => {

  const [modalCrearEditarProyectos, setModalCrearEditarProyectos] = useState(false);
  const [proyectoAlbercaSeleccionado, setProyectoAlbercaSeleccionado] = useState([]);
  const [ventanaCarga, setVentanaCarga] = useState(false);
  const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false);

  return (
    <>
    {ventanaCarga && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-screen h-screen flex items-center justify-center">
          <Player
            src="https://lottie.host/6e504b56-2da0-430e-9861-0a2186e4ae0f/hkIjXR28gA.json"
            className="player absolute bottom-0 w-full"
            loop
            autoplay
            speed={0.2}
            style={{ width: '100%', zIndex: -1 }} // Ajusta el zIndex a un valor negativo para que se vea por debajo
          />
          <div className="hidden lg:flex h-full w-full items-center justify-center" style={{ flexDirection: 'column' }}>
            <div className="w-auto h-auto mx-auto">
              <img className="" src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62" alt="Your Company"/>
              <h1 className='animate-pulse text-3xl text-white pt-6'>Cargando<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></h1>
            </div>  
          </div>
        </div>
      </div>
      )}

      <DialogRegistroGuardado setModalRegistroGuardado={setModalRegistroGuardado} modalRegistroGuardado={modalRegistroGuardado}/>

        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <h1 className="text-2xl font-bold text-[#245A95] pb-4">Crear o editar proyecto</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
                <div 
                    className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                    onClick={() => {
                      setModalCrearEditarProyectos(true) 
                      setProyectoAlbercaSeleccionado(undefined)
                    }}
                >
                  <div className="px-2 py-1 bg-[#E2E2E2]">
                    <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVO PROYECTO</div>
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
                          Busca el proyecto
                        </label>
                    </span>
                </div> 
            </div>

            <TableProyectos
              proyectoAlbercaSeleccionado={proyectoAlbercaSeleccionado}
              setProyectoAlbercaSeleccionado={setProyectoAlbercaSeleccionado}
              setModalCrearEditarProyectos={setModalCrearEditarProyectos}
              modalRegistroGuardado={modalRegistroGuardado}
            />

            <FormProyectos 
              modalCrearEditarProyectos={modalCrearEditarProyectos}
              proyectoAlbercaSeleccionado={proyectoAlbercaSeleccionado}
              setModalCrearEditarProyectos={setModalCrearEditarProyectos}
              setVentanaCarga={setVentanaCarga}
              setModalRegistroGuardado={setModalRegistroGuardado}
            />
        </div>
    </>
  )
}
