import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { api } from '../helpers/variablesGlobales';
import { InputText } from 'primereact/inputtext';
  
  const initialValues = {
    multiSelectField: [],
  };

  const opcionesTipoReporte = [
    {label: 'BITÁCORA DIARIA', value: 'BITACORA DIARIA'},
    {label: 'REPORTE SEMANAL', value: 'REPORTE SEMANAL'},
    {label: 'REPORTE FOTOFRÁFICO MENSUAL', value: 'REPORTE FOTOFRÁFICO MENSUAL'},
  ]

const RegistrosForm = ({setModalNuevoReporteMensual, sedes, sedeSeleccionada, setSedeSeleccionada, albercas, setAlbercas, clienteSeleccionado, registrosDrPool, setRegistrosDrPool, tipoReporSeleccionado, setTipoReporSeleccionado, setSearchSede, albercaSeleccionada, setAlbercaSeleccionada}) => {

  const [cargando, setCargando] = useState(false);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
    {/* Ventana de carga */}
    {cargando && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center transition duration-500 ease-in-out">
            <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
              <img src="/src/assets/isae.png" alt="Icono" className="h-20 xl:h-40 mr-1 animate-spin"/>
            </span>
            <img src="/src/assets/letras_isae.png" alt="Icono" className="h-20 xl:h-40 mr-2" />
          </div>
          <div className='fixed pt-36 xl:pt-60'>
          <h1 className='text-[#C41420] text-4xl font-black animate-pulse'>Cargando...</h1>
          </div>
        </div>
      )}

    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik, values ) => (
            <Form>
                <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
                  <h1 className='mx-0 my-1 text-xl font-bold text-[#245A95]'>Buscar registro</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">

                    <div className="mt-8 mx-4 flex flex-col">
                        <div className='p-inputgroup flex-1'>
                          <span className='p-float-label relative'>
                            <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="sedes"
                              value={sedeSeleccionada}
                              options={sedes?.filter((sede) => (sede.cliente.cliente === clienteSeleccionado.cliente))}
                              optionLabel="nombre"
                              filter
                              emptyFilterMessage='No se encontarron sedes'
                              onChange={(e) => setSedeSeleccionada(e.target.value)}
                            />
                            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                            </span>
                            <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                              Selecciona la sede
                            </label>
                          </span>
                        </div>
                    </div>
                    <div className="mt-8 mx-4 flex flex-col">
                      {
                        sedeSeleccionada != null && 
                        <div className='p-inputgroup flex-1'>
                          <span className='p-float-label relative'>
                            <Field
                              as={Dropdown}
                              name="albercas"
                              options={albercas?.filter((alberca) => (alberca.sede.nombre === sedeSeleccionada.nombre && alberca.estatus === "ACTIVO"))}
                              optionLabel="nombrealberca"
                              filter
                              emptyFilterMessage='No se encontraron albercas'
                              value={albercaSeleccionada}
                              onChange={(e)=>{   
                                setAlbercaSeleccionada(e.target.value);
                                fetch(`${api}/obtener/registrosalberca/${e.target.value.idalberca}`, {
                                  method: 'GET',
                                  headers: {
                                    'Content-Type': 'application/json' 
                                  },
                                  
                                })
                                  .then(response => response.json())
                                  .then(responseData => {
                                    // console.log(responseData)
                                    // obtenemos los proyectos
                                    setRegistrosDrPool(responseData)                     
                                  })
                                  .catch(error => console.log(error));
                              }}
                              display="chip"
                              className="w-full appearance-none focus:outline-none bg-transparent"
                            />
                            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                            </span>
                            <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                              Selecciona la alberca
                            </label>
                          </span>
                        </div>
                      }   
                    </div>     
                    <div className="mt-8 mx-4 flex flex-col">
                      {
                        // listaCampos.length === 0 ? <div></div> :
                        <div className='p-inputgroup flex-1'>
                            <span className='p-float-label relative'>
                              <Field
                                as={Dropdown}
                                name="tiporeporte"
                                value={tipoReporSeleccionado}
                                options={opcionesTipoReporte}
                                optionLabel='label'
                                emptyFilterMessage='Campo no encontradofh'
                                filterPlaceholder='Campo'
                                onChange={(e) => (setTipoReporSeleccionado(e.target.value))}
                                display="chip"
                                className="w-full appearance-none focus:outline-none bg-transparent"
                              />
                              <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                              </span>
                              <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                Selecciona el tipo de reporte
                              </label>
                            </span>
                          </div>
                      }        
                    </div>
                    {
                      tipoReporSeleccionado === 'REPORTE FOTOFRÁFICO MENSUAL' &&
                      <div className="mt-8 mx-4 flex-col flex py-2">
                      <button
                        type="button"
                        // disabled={!formik.dirty || formik.isSubmitting}
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={()=>{
                          setModalNuevoReporteMensual(true);
                        }}
                      >
                        <ion-icon name="newspaper"></ion-icon> Nuevo reporte mensual
                      </button>
                    </div>
                    }
                    </div>
                    {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4"> */}
                      <div className="mt-8 px-64 flex flex-col p-inputgroup justify-self-center">
                          <div className="flex flex-col">
                            <span className='p-float-label relative'>
                                <InputText
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    name="direccion"
                                    type='text'
                                    // value={searchTerm.toUpperCase()}
                                    onChange={(e) => (setSearchSede(e.target.value))}  
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Buscar reporte
                                </label>
                            </span>
                            <p className="text-base text-[#245A95] font-semibold">Buscar por folio o fecha de creación</p>
                          </div>         
                      </div>
                    {/* </div> */}
                </div>
            </Form>
        )}
    </Formik>
    </>
  )
}

export default RegistrosForm