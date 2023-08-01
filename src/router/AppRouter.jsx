import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { DanaRoutes } from '../dana/routes/DanaRoutes'
import ExampleContexProvider from '../dana/context/ExampleContext'

export const AppRouter = () => {
  return (
    <>
      <ExampleContexProvider>
        <Routes>
            <Route path='Login' element={<LoginPage/>}/>
            <Route path='/*' element={<DanaRoutes/>}/>
        </Routes> 
      </ExampleContexProvider>     
    </>
  )
}
