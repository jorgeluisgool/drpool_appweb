import React from 'react'
import { TabaUsuarios } from '../components/TablaUsuarios'
import { AlbercaDraw } from '../components/AlbercaDraw'

export const UsuariosPage = () => {
  return (
    <>
    <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Usuarios</h1>
    <TabaUsuarios/>
    <AlbercaDraw/>
    </>
    
  )
}
