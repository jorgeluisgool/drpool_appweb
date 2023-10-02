import React, { useEffect } from 'react'
import { EquiposAlbercaSeccion } from '../components/equiposAlberca/EquiposAlbercaSeccion'
import useAuth from '../hooks/useAuth';

export const EquiposAlbercaPage = () => {

  const { userAuth, setUserAuth } = useAuth();

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
        <div className="py-8">
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Equipos</h1>
            <EquiposAlbercaSeccion/>
        </div>
    </>
  )
}
