import { useEffect, useState } from "react";
import { getProjectClient } from "../helpers/getProjectClient";
import { api } from "../helpers/variablesGlobales";

const acomodarDatos = (lista) => {
  const nuevaLista = [];
  lista.map((item, index) => {
      const newItem = { ...item, id: index };
      nuevaLista.push(newItem);
  });

  return nuevaLista;
}

export const useFetchProjetsClientes = (clienteSeleccionado)=>{

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getProjectClient(api, clienteSeleccionado)
          .then(projects => {
            // console.log('Cargando datos...');
            setState({
                data: acomodarDatos(projects),
                loading: false
            });

          });
          //Utilizar los parentesis para mandar el parametro en dado caso que necesitemos volver a cargar el metodo
      }, [])

    return state;

}