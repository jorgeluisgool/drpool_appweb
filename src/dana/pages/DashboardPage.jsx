import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import { Dropdown } from 'primereact/dropdown';
import LinesChart from '../components/graficas/LinesChart';
import Breadcrumb from '../components/graficas/Breadcrumb';

export const DashboardPage = () => {

  const breadcrumbItems = [
    { text: 'PARÁMETROS QUÍMICOS', link: '/' },
    { text: 'CONSUMO DE QUÍMICOS', link: '/categoria' },
  ];

  const opcionesGrafica = [
    { label: 'Año', value: 'Año' },
    { label: 'Mes', value: 'Mes' },
  ];

  // Aqui obtengo el context del cliente seleccionado y usuario logiado
  const { clienteSeleccionado, userAuth, setUserAuth } = useAuth();

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
        <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Dashboards</h1>
        <div className="container mx-auto">
          <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
            {/* <h1 className="text-2xl font-bold text-[#245A95] pb-4">ALTA DE USUARIO</h1> */}
            <div className="container mx-auto text-lg font-bold text-[#245A95]">
              <Breadcrumb items={breadcrumbItems} />
              {/* Otro contenido de la aplicación */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="mt-4 mx-4">
                <div className='p-inputgroup flex-1'>
                  <span className='p-float-label relative'>
                    <Dropdown
                      className="w-full appearance-none focus:outline-none bg-transparent"
                      name="sedes"
                      value={''}
                      options={opcionesGrafica}
                      optionLabel="label"
                      filter
                      emptyFilterMessage='No se encontarron sedes'
                    />
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                      Selecciona
                    </label>
                  </span>
                </div>
              </div>
              <div className="mt-4 mx-4 col-span-3 flex flex-col">
                <LinesChart/>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}
