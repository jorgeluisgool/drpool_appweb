import React from 'react'
import {Navigate, Outlet} from "react-router-dom"

export const ProtectedRoutes = () => {

    let isLogged = localStorage.getItem("token")

    if (!isLogged){
        return <Navigate to="login"/>
    }

  return (
    <Outlet/>
  )
}