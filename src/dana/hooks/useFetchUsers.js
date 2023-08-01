import { useEffect, useState } from "react";
import { getUsuarios } from "../helpers/getUsers";
import { api } from "../helpers/variablesGlobales";

const acomodarDatos = (lista) => {
  const nuevaLista = [];
  lista.map((item, index) => {
      const newItem = { ...item, id: index };
      nuevaLista.push(newItem);
  });

  return nuevaLista;
}

export const useFetchUsers = ()=>{
  // console.log(prueba)
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getUsuarios(api)
          .then(usuarios => {
            // console.log('Cargando datos...');
            setState({
                data: acomodarDatos(usuarios),
                loading: false
            });

          });
          //Utilizar los parentesis para mandar el parametro en dado caso que necesitemos volver a cargar el metodo
      }, [])

    return state;

}