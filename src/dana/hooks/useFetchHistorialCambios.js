import { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { getHistorialCambios } from "../helpers/getHistorialCambios";

const acomodarDatos = (lista) => {
  const nuevaLista = [];
  lista.map((item, index) => {
      const newItem = { ...item, id: index };
      nuevaLista.push(newItem);
  });

  return nuevaLista;
}

export const useFetchHistorialCambios = (proyectoSeleccionado, modalHistorialAbrirCerrar)=>{

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getHistorialCambios(api, proyectoSeleccionado)
          .then(projects => {
            // console.log('Cargando datos...');
            setState({
                data: acomodarDatos(projects),
                loading: false
            });

          });
          //Utilizar los parentesis para mandar el parametro en dado caso que necesitemos volver a cargar el metodo
      }, [proyectoSeleccionado, modalHistorialAbrirCerrar])

    return state;

}