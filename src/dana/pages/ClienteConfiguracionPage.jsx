import { Field } from 'formik'
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import { ClienteConfiguracionForm } from '../components/clienteConfiguracion/ClienteConfiguracionForm';
import useAuth from '../hooks/useAuth';
import { BotonFlotanteGuardar } from '../components/BotonFlotanteGuardar';
import { api } from '../helpers/variablesGlobales';

export const ClienteConfiguracionPage = () => {

  const [codigoMovil, setCodigoMovil] = useState('');
  const [copiado, setCopiado] = useState(false);

  const { setUserAuth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/pass`);
        const codigoData = await response.text();
        console.log(codigoData)
        setCodigoMovil(codigoData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  // funcion que hace que al hacer refesh se mantenga el usuario activo
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
  
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserAuth(foundUser);
    }
  }, []);

  const copiarTexto = () => {
    const textoParaCopiar = codigoMovil;

    const textarea = document.createElement('textarea');
    textarea.value = textoParaCopiar;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);

    setCopiado(true);

    // Resetear el estado de 'copiado' después de unos segundos
    setTimeout(() => {
      setCopiado(false);
    }, 3000);
  };

  return (
    <>
      <div className="py-8">
        <h1 className="text-4xl font-black text-[#245A95] pl-3 xl:pl-20 mb-8">CONFIGURACIÓN</h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-1 mx-4 xl:mx-20">
          <div className="group">
          <div className="xl:grid xl:grid-cols-2 items-center h-30 overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105">
            <img
              className="object-cover h-auto"
              src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62"
              alt="Logo de la empresa"
            />
            <div className="xl:grid xl:grid-cols-2 bg-white p-6 rounded-b-lg shadow-md">
              <div>
                <p className="text-[#245A95] font-bold text-lg mb-2">Código de acceso app móvil:</p>
                <p className="text-gray-600 mb-4">{codigoMovil}</p> 
                <button
                  className="fixed bottom-4 right-4 px-4 ml-auto w-14 h-14 object-cover active:scale-[1.2] py-3 bg-[#245A95] hover:bg-white hover:text-[#245A95] text-white text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4"
                  onClick={copiarTexto}
                >
                  <ion-icon name="copy-outline"></ion-icon>
                </button>
                {copiado && (
                  <div className="absolute bottom-6 right-20 bg-[#245A95] text-white p-2 rounded shadow-md">
                    ¡Código copiado!
                  </div>
                )}
              </div> 
            </div>
          </div>
 
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        <p className="text-[#245A95] font-bold text-lg mb-2">Nombre de la empresa:</p>
        <p className="text-gray-600 mb-4">Dr Pool Don't Worry Water</p>

        <p className="text-[#245A95] font-bold text-lg mb-2">Teléfono de contacto:</p>
        <p className="text-gray-600 mb-4">(55) 8525 4747</p>

        <p className="text-[#245A95] font-bold text-lg mb-2">Correo electrónico:</p>
        <p className="text-gray-600 mb-4">ventas@drpool.mx</p>

        <p className="text-[#245A95] font-bold text-lg mb-2">Domicilio de las oficinas:</p>
        <p className="text-gray-600 mb-4">San Francisco #1525, Tlacoquemecatl, Benito Juárez, CDMX, CP. 03200</p>

        <p className="text-[#245A95] font-bold text-lg mb-2">RFC:</p>
        <p className="text-gray-600 mb-4">DPO1907195W1</p>

        <p className="text-[#245A95] font-bold text-lg mb-2">Giro comercial:</p>
        <p className="text-gray-600">Servicios</p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
