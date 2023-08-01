import React from 'react'

const listaBotones = [
  {
    'id':'PROYECTOS',
    'icon':'archive-outline'
  },
  {
    'id':'USUARIOS',
    'icon':'bi bi-person-plus iconoblanco'
  },
  {
    'id':'CATALOGO',
    'icon':'archive-outline'
  },
  {
    'id':'ASIGNACIONES',
    'icon':'archive-outline'
  },
  {
    'id':'REGISTROS',
    'icon':'archive-outline'
  }
];

export const BotonMenu = ({titulo, icono}) => {
  
  return (
    <>
      <div className='bg-[#245A95] w-24 h-24 object-cover rounded-full border border-sky-700 text-center pt-4    max-w-xs overflow-hidden shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 cursor-pointer'>
        <span className='hover:text-gray-400 text-6xl text-slate-50'>
          <ion-icon name={icono}></ion-icon>
        </span>
      </div>
      
    </>      
  )
}
