import { useState, createContext } from "react";

export const ExampleContex = createContext({});

export default function ExampleContexProvider({children}) {

    const [userAuth, setUserAuth] = useState({});
    const [dataCrearProyecto, setDataCrearProyecto] = useState('');
    const [dataArchivoExcel, setDataArchivoExcel] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState([]);

    return (
        <ExampleContex.Provider 
        value={{
            userAuth,
            setUserAuth,
            dataCrearProyecto, 
            setDataCrearProyecto,
            dataArchivoExcel,
            setDataArchivoExcel,
            clienteSeleccionado,
            setClienteSeleccionado
        }}>
            {children}
        </ExampleContex.Provider>
    )
}