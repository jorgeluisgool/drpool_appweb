import React from 'react'

export const TarjetaEquiposProyecto = ({albercaSelected}) => {
  return (
    <>
        <div className="mb-6 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group">
        <h1 className='text-2xl font-bold text-center'>EQUIPOS</h1>
          <h1 className='text-2xl font-bold text-center text-[#245A95]'>{albercaSelected?.nombrealberca ?? ''}</h1>
          <h1 className='text-lg font-bold text-center text-[#245A95]'>{albercaSelected?.tipoalberca ?? ''}</h1>
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src={albercaSelected?.sede?.cliente?.urllogo ?? ''} alt="Random image" />
              <h1 className='text-md font-bold text-center text-[#245A95]'>{albercaSelected?.sede?.nombre ?? ''}</h1>
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-sm text-[#245A95] font-semibold">Bombeo</div>
              <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim purus vitae nulla maximus, eu dignissim velit porttitor.</p>
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-sm text-[#245A95] font-semibold">Filtrado</div>
              <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim purus vitae nulla maximus, eu dignissim velit porttitor.</p>
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-sm text-[#245A95] font-semibold">Calentamiento</div>
              <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim purus vitae nulla maximus, eu dignissim velit porttitor.</p>
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-sm text-[#245A95] font-semibold">Dosificador</div>
              <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim purus vitae nulla maximus, eu dignissim velit porttitor.</p>
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-sm text-[#245A95] font-semibold">Controlador</div>
              <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim purus vitae nulla maximus, eu dignissim velit porttitor.</p>
            </div>  
          </div>
          <div className="p-6 bg-gray-50 transition duration-300 ease-in-out transform hover:-translate-y-2">
            <a href="#" className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Click me
            </a>
          </div>
        </div>
    </>
  )
}
