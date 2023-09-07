import React from 'react'
import { EquiposAlbercaSeccion } from '../components/equiposAlberca/EquiposAlbercaSeccion'

export const EquiposAlbercaPage = () => {
  return (
    <>
        <div className="py-8">
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Equipos</h1>
            <EquiposAlbercaSeccion/>
        </div>
    </>
  )
}
