import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BotonMenu } from '../components/BotonMenu'
import useAuth from '../hooks/useAuth';

export const HomeScreem = ({titulo}) => {

  const { userAuth: usuarioLogiado, setUserAuth, clienteSeleccionado } = useAuth();

  console.log(usuarioLogiado[0]);

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
    <div className="bg-[#E2E2E2] h-full grid grid-cols-2 sm:grid-cols-3 gap-14 pt-20">
      {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
        <div className="flex flex-col items-center justify-center">
          <Link to='/Proyectos'>
            <BotonMenu titulo='PROYECTOS' icono='library-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>PROYECTOS</p>
          </div>
        </div> : <></>
      }
      {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ? 
        <div className="flex flex-col items-center justify-center">
          <Link to='/clientes'>
            <BotonMenu titulo='CATALOGO' icono='business-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>CLIENTES, SEDES Y ALBERCAS</p>
          </div>
        </div> : <></>
      }
      {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ? 
        <div className="flex flex-col items-center justify-center">
          <Link 
            to='/equipos'
          >
            <BotonMenu titulo='CATALOGO' icono='construct-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>EQUIPOS</p>
          </div>
        </div> : <></>
      }
      {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ? 
        <div className="flex flex-col items-center justify-center">
          <Link to='/usuarios'>
            <BotonMenu titulo='USUARIOS' icono='person-add-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>USUARIOS</p>
          </div>
        </div> : <></>
      }
      
      {/* {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
        <div className="flex flex-col items-center justify-center">
          <Link to='/catalogos'>
            <BotonMenu titulo='CATALOGO' icono='clipboard-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>CATALOGO</p>
          </div>
        </div> : <></>
      } */}
      {/* {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
        <div className="flex flex-col items-center justify-center">
          <Link to='/asignaciones'>
            <BotonMenu titulo='ASIGNACIONES' icono='accessibility-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>ASIGNACIONES</p>
          </div>
        </div> : <></>
      } */}
      {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
        <div className="flex flex-col items-center justify-center">
          <Link to={clienteSeleccionado.length === 0 ? `/cliente` : `/registros`}>
            <BotonMenu titulo='REGISTROS' icono='create-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>REGISTROS</p>
          </div>
        </div> : <></>
      }
      {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
        <div className="flex flex-col items-center justify-center">
          <Link to='/asistencia'>
            <BotonMenu titulo='ASISTENCIA' icono='id-card-outline'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>ASISTENCIA</p>
          </div>
        </div> : <></>
      }
      {/* {
        usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
        <div className="flex flex-col items-center justify-center">
          <Link to='/dashboard'>
            <BotonMenu titulo='ASISTENCIA' icono='bar-chart'/>
          </Link>
          <div className='pt-5'>
            <p className='text-center text-[#245A95] font-bold'>DASHBOARD</p>
          </div>
        </div> : <></>
      } */}
      {/* <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='DASHBORAD' icono='extension-puzzle-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>DASHBORAD</p>
        </div>
      </div> */}
    </div>  
    </>
  
  )
}
