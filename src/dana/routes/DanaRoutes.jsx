import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/components/Navbar'
import CamposProyectoPage from '../pages/CamposProyectoPage'
import { HomeScreem } from '../pages/HomeScreem'
import ProyectosPage from '../pages/ProyectosPage'
import { RegistrosPage } from '../pages/RegistrosPage'
import ExampleContexProvider from '../context/ExampleContext'
import { ProtectedRoutes } from '../../router/ProtectedRoutes'
import EjemploFormularioRegistros from '../components/EjemploFormularioRegistros'
import { ClientesRegistrosPage } from '../pages/ClientesRegistrosPage'
import { EjemploMultiFile } from '../components/ejemploMultiFile'
import { MultiFile } from '../components/MultiFile'
import { ClientesPage } from '../pages/ClientesPage'
import { RegistrosPagePrueba } from '../pages/RegistrosPagePrueba'
import { UsuariosPage } from '../pages/UsuariosPage'
import { AsistenciaPage } from '../pages/AsistenciaPage'
import { CatalogosPage } from '../pages/CatalogosPage'
import { AsignacionesPage } from '../pages/AsignacionesPage'

export const DanaRoutes = () => {

  return (
    <>
    <Navbar/>
      <div className='min-h-screen bg-[#E2E2E2] pt-20'>
        
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='menu' element={ <HomeScreem/>}/>
              <Route path='proyectos' element={ <ProyectosPage/>}/>
              <Route path='usuarios' element={ <UsuariosPage/>}/>
              <Route path='asistencia' element={ <AsistenciaPage/>}/>
              <Route path='ejemplo' element={ <MultiFile/>}/>
              <Route path='camposproyecto' element={ <CamposProyectoPage/>}/>
              <Route path='registropage' element={ <RegistrosPagePrueba/>}/>
              {/* <Route path='registropage' element={ <RegistrosPage/>}/> */}
              <Route path='registros' element={ <ClientesRegistrosPage/>}/>
              <Route path='clientes' element={ <ClientesPage/>}/>
              <Route path='catalogos' element={ <CatalogosPage/>}/>
              <Route path='asignaciones' element={ <AsignacionesPage/>}/>
              <Route path='/' element={<Navigate to='menu'/>}/>
            </Route>
          </Routes>
        
      </div>
    </>
  )
}
