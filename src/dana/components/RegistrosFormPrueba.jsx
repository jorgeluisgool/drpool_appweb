import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { api } from '../helpers/variablesGlobales';
  
  const initialValues = {
    multiSelectField: [],
  };
  
  const onSubmit = (values) => {
    console.log(values);
  };

//   const sede = [
//     {'label': 'Villa Olímpica'},
//     {'label': 'Albercas Obregón'},
//   ]

//   const sedes = [
//     { label: 'Villa Olímpica', value: 'villa Olimpica' },
//     { label: 'Albercas Obregón', value: 'llbercas Obregon' }
//   ];
  
  const sedes = [
    { label: 'Villa Olímpica', value: 'villa olimpica' },
    { label: 'Albercas Obregón', value: 'albercas obregon' },
    { label: 'Albercas 2', value: 'albercas2' },
    // Agrega más opciones si es necesario
  ];

  const albercas = [
    { label: 'Alberca olímpica', value: 'alberca olimpica' },
    { label: 'Alberca de Clavados', value: 'alberca de clavados' },
    { label: 'Alberca de natación', value: 'alberca de natacion' },
    // Agrega más opciones si es necesario
  ];

  const tipoReporte = [
    { label: 'Bitácora diaria', value: 'Bitacora diaria' },
    { label: 'Reporte semanal', value: 'Reporte semanal' },
    { label: 'Reporte Mensual', value: 'Reporte Mensual' },
    // Agrega más opciones si es necesario
  ];
const RegistrosFormPrueba = ({usuarios, listaRegistros, setListaRegistros, usuariosSeleccionados, setUsuariosSeleccionados, proyectosClientes}) => {

  const [listaRegistrosValor, setListaRegistrosValor] = useState([]);
  const [listaProyectos, setListaProyectos] = useState([]);
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState([]);
  const [listaCampos, setListaCampos] = useState([]);
  // const [listaRegistros, setListaRegistros] = useState([]);
  const [campoSeleccionado, setCampoSeleccionado] = useState([]);
  const [listaValores, setListaValores] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState([]);

  const [cargando, setCargando] = useState(false);

  // const [lista, setLista] = useState([]);

  // console.log(proyectosSeleccionados);

  const listaProyectosFiltrados = listaProyectos.filter((obj, index, self) =>
    index === self.findIndex((o) => o.proyecto === obj.proyecto)
  );

  const listaValoresFiltrados = listaValores.filter((obj, index, self) => 
    index === self.findIndex((o) => o.valor.trim() === obj.valor.trim())
  ); 

  // console.log(listaRegistrosValor);


  const handleProyectoCliente = (proyecto) => {
    
    fetch(`${api}/obtener/proyectos/cliente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ListaUsuariosProyectos),
    }).then((response) => response.json())

    .then((response) => response.json())
    .then((responseData) => {
      setListaValores(responseData);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
    });
}

const handleUsuarioChange = (usuario) => {
  setUsuariosSeleccionados(usuario.target.value);

  if (usuario.target.value.length !== 0) {
    setCargando(true); // Activar ventana de carga
    const fetchPromises = usuario.target.value.map((usuario) => {
      return fetch(`${api}/obtener/registros/asignados/usuario/proyecto/${usuario.idusuario}/${proyectosSeleccionados[0].idproyecto}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json());
    });

    Promise.all(fetchPromises)
      .then((responsesData) => {
        console.log(responsesData)
        const lista = responsesData.flat();
        setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
        console.log(lista);
        setListaRegistros(lista);
      })
      .catch((error) => console.log(error));
  } else {
    setListaRegistros(listaRegistrosValor);
  }
};



  const handleProyectoChange = (proyecto) => {
    
    setProyectosSeleccionados([proyecto.target.value]);
    setCargando(true); // Activar ventana de carga

    const ListaUsuariosProyectos = {
      usuarios: usuariosSeleccionados,
      proyectos: [proyecto.target.value],
    };

    Promise.all([
      fetch(`${api}/obtener/registros/proyecto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proyecto.target.value),
      }).then((response) => response.json()),
      
      fetch(`${api}/obtener/campos/proyectos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([proyecto.target.value]),
      }).then((response) => response.json()),
    ])
      .then(([registrosData, camposData]) => {
        setListaRegistros(registrosData);
        setListaRegistrosValor(registrosData);
        setListaCampos(camposData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
      });
  };

  const handleCampoChange = (campo) => {
    setCampoSeleccionado(campo.target.value);
    setCargando(true); // Activar ventana de carga

    fetch(`${api}/obtener/valores/busqueda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarios: usuariosSeleccionados,
        proyecto: proyectosSeleccionados,
        campo: campo.target.value,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setListaValores(responseData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
      });
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
                                    as={Dropdown}
                                    name="listaProyectosFiltrados"
                                    options={sedes}
                                    optionLabel="label"
                                    filter
                                    emptyFilterMessage='No se encontarron proyectos'
                                    // onChange={handleProyectoChange}
                                    // onChange={(proyecto) => {
                                    //   setProyectosSeleccionados([proyecto.target.value]);
                                    //   const ListaUsuariosProyectos = {usuarios: usuariosSeleccionados, proyectos: [proyecto.target.value]}

                                    //   // obtencion de los registros de acuerdo a los usuarios selecionados y al proyecto seleccionado
                                    //   fetch(`${api}/obtener/registros/asignados/usuario/proyecto`, {
                                    //     method: 'POST',
                                    //     headers: {
                                    //       'Content-Type': 'application/json' 
                                    //     },
                                    //     body: JSON.stringify(ListaUsuariosProyectos) 
                                    //   })
                                    //     .then(response => response.json())
                                    //     .then(responseData => {
                                    //       console.log(responseData)
                                    //       setListaRegistros(responseData);
                                    //       setListaRegistrosValor(responseData);                
                                    //     })
                                    //     .catch(error => console.log(error)); 
                                        
                                    //     // obenemos los campos para el select de buscar por
                                    //     fetch(`${api}/obtener/campos/proyectos`, {
                                    //       method: 'POST',
                                    //       headers: {
                                    //         'Content-Type': 'application/json' 
                                    //       },
                                    //       body: JSON.stringify([proyecto.target.value]) 
                                    //     })
                                    //       .then(response => response.json())
                                    //       .then(responseData => {
                                    //         console.log(responseData)
                                    //         setListaCampos(responseData);                
                                    //       })
                                    //       .catch(error => console.log(error));
                                    // }}
                                    // value={proyectosSeleccionados[0]}
                                    
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                  />
                                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                    <i className="pi pi-file text-[#245A95] font-bold text-2xl"></i>
                                  </span>
                                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Selecciona una sede
                                  </label>
                                </span>
                              </div>
                        </div>
                        <div className="mt-8 mx-4 flex flex-col">
                          {
                            // listaCampos.length === 0 ? <div></div> :
                            <div className='p-inputgroup flex-1'>
                              <span className='p-float-label relative'>
                                <Field
                                  as={Dropdown}
                                  name="usuarios"
                                  options={albercas}
                                  optionLabel="label"
                                  filter
                                  emptyFilterMessage='No se encontraron usuarios'
                                  // onChange={handleUsuarioChange}
                                  // onChange={(usuario)=>{
                                  //   setUsuariosSeleccionados(usuario.target.value);
                                  //   // console.log(usuario.target.value);

                                  //   fetch(`${api}/obtener/proyectos/asignados/usuarios`, {
                                  //     method: 'POST',
                                  //     headers: {
                                  //       'Content-Type': 'application/json' 
                                  //     },
                                  //     body: JSON.stringify(usuario.target.value) 
                                  //   })
                                  //     .then(response => response.json())
                                  //     .then(responseData => {
                                  //       // console.log(responseData)
                                  //       // obtenemos los proyectos
                                  //       setListaProyectos(responseData)
                                        
                                  //     })
                                  //     .catch(error => console.log(error));
                                  // }}
                                  // value={usuariosSeleccionados}
                                  display="chip"
                                  className="w-full appearance-none focus:outline-none bg-transparent"
                                />
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-users text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Selecciona una Alberca
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
                                    name="BuscarCampo"
                                    options={tipoReporte}
                                    optionLabel='label'
                                    filter
                                    emptyFilterMessage='Campo no encontradofh'
                                    filterPlaceholder='Campo'
                                    onChange={handleCampoChange}
                                    // onChange={(campo) =>{

                                    //   setCampoSeleccionado(campo.target.value)
                                    //   fetch(`${api}/obtener/valores/busqueda`, {
                                    //     method: 'POST',
                                    //     headers: {
                                    //       'Content-Type': 'application/json' 
                                    //     },
                                    //     body: JSON.stringify({usuarios: usuariosSeleccionados, proyecto:proyectosSeleccionados, campo:campo.target.value}) 
                                    //   })
                                    //     .then(response => response.json())
                                    //     .then(responseData => {
                                    //       console.log(responseData)
                                    //       setListaValores(responseData);                  
                                    //     })
                                    //     .catch(error => console.log(error)); 
                                    // }}
                                    value={campoSeleccionado}
                                    display="chip"
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                  />
                                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                    <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                  </span>
                                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Selecciona el tipo de reporte
                                  </label>
                                </span>
                              </div>
                          }
                                
                        </div>
                        <div className="mt-8 mx-4 flex flex-col">
                          {
                            listaValores.length === 0 ? <></> :
                            <div className='p-inputgroup flex-1'>
                                <span className='p-float-label relative'>
                                  <Field
                                    as={Dropdown}
                                    name="valores"
                                    options={listaValoresFiltrados}
                                    optionLabel="valor"
                                    filter
                                    emptyFilterMessage='Valor del campo no encontrado'
                                    filterPlaceholder='Nombre de proyecto'
                                    onChange={(valor) => {
                                      setValorSeleccionado(valor.target.value);
                                      console.log(valor.target.value);

                                     const resultados =  listaValores.filter(item => item.valor.trim() === valor.target.value.valor.trim());

                                    

                                      setListaRegistros(resultados.map(item => item.inventario));
                                    }}
                                    value={valorSeleccionado}
                                    display="chip"
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                  />
                                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                    <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                  </span>
                                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Buscar:
                                  </label>
                                </span>
                              </div>
                          }       
                        </div>
                    </div>
                    <div className="flex py-2 mt-6 justify-end">
                      <button
                        type="submit"
                        // disabled={!formik.dirty || formik.isSubmitting}
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={()=>{
                          console.log(listaRegistrosValor);
                          setListaRegistros(listaRegistrosValor);
                        }}
                      >
                        <ion-icon name="eye" className="mr-2 text-2xl"></ion-icon> Ver todos
                      </button>
                    </div>
                    {/* <div className="flex">
                        <button type="submit" disabled={!formik.dirty || formik.isSubmitting} className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                            <ion-icon name="search"></ion-icon>
                        </button>
                    </div> */}
                </div>
            </Form>
        )}
    </Formik>
    </>
  )
}

export default RegistrosFormPrueba