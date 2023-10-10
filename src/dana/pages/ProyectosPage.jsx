import { useEffect } from "react";
import { CrearProyectoForm } from "../components/CrearProyectoForm";
import { SkeletonTabla } from "../components/SkeletonTabla";
import { TablaCRUD } from "../components/TablaCRUD";
import { useFetchProjects } from "../hooks/useFetchProjects";
import useAuth from '../hooks/useAuth';
import { Player } from "@lottiefiles/react-lottie-player";
import { ProyectosSeccion } from "../components/proyectos/ProyectosSeccion";
import { Ejmplopdf } from "./ejmplopdf";


const ProyectosPage = () => {

  const { userAuth, setUserAuth } = useAuth();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserAuth(foundUser);
      // console.log(foundUser)
    }
  }, []);

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
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Alta de proyectos</h1>
            <ProyectosSeccion/>

            {/* <Ejmplopdf/> */}
        </div> 
        </>
  )
}

export default ProyectosPage