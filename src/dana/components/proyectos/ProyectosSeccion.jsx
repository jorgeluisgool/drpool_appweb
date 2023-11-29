import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { TableProyectos } from './TableProyectos'
import { FormProyectos } from './FormProyectos'
import { DialogRegistroGuardado } from '../../../ui/components/DialogRegistroGuardado'
import { VentanaCarga } from '../../../ui/components/VentanaCarga'
import { api } from '../../helpers/variablesGlobales'
import useAuth from '../../hooks/useAuth'
import { DialogWarning } from '../../../ui/components/DialogWarning'

export const ProyectosSeccion = () => {

  const { userAuth, setUserAuth, setClienteSeleccionado } = useAuth();

  const [clientes, setClientes] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [modalCrearEditarProyectos, setModalCrearEditarProyectos] = useState(false);
  const [proyectoAlbercaSeleccionado, setProyectoAlbercaSeleccionado] = useState(undefined);
  const [ventanaCarga, setVentanaCarga] = useState(false);
  const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [proyectoAlbercaData, setProyectoAlbercaData ] = useState([]);
  const [clienteSelect, setClienteSelect] = useState('TLAHUAC');
  const [sedeSelect, setSedeSelect] = useState('');
  const [mensajeNoAlbercasEnSedes, setMensajeNoAlbercasEnSedes] = useState('');
  const [modalWarning, setModalWarning] = useState(false);
 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${api}/obtener/proyectosalberca`);
            const jsonData = await response.json();
            console.log(jsonData)
            setProyectoAlbercaData(jsonData);
          } catch (error) {
            console.log('Error:', error);
          }
        };
   
        fetchData();
      }, [modalRegistroGuardado]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${api}/obtener/clientes/usuario/${userAuth[0].clienteAplicacion.idcliente}`);
            const jsonData = await response.json();
            setClientes(jsonData);
          } catch (error) {
            console.log('Error:', error);
          }
        };
        fetchData();
      }, []); 

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${api}/obtener/sedes`);
            const jsonData = await response.json();
            setSedes(jsonData);
          } catch (error) {
            console.log('Error:', error);
          }
        };
    
        fetchData();
      }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // console.log(proyectoAlbercaData)
   const filterProyectos = proyectoAlbercaData.filter((proyectoAlbercaData) =>
     proyectoAlbercaData.nombreproyectoalberca.toLowerCase().includes(searchTerm.toLowerCase()) ||
     proyectoAlbercaData.numeroproyecto.toLowerCase().includes(searchTerm.toLowerCase())
     
   );

  //  console.log(clienteSelect);
  const clientesActivos = clientes.filter(cliente => cliente.estatus === "ACTIVO");

  return (
    <>
      {
        ventanaCarga && (
          <VentanaCarga/>
      )}

      <DialogRegistroGuardado 
        setModalRegistroGuardado={setModalRegistroGuardado} 
        modalRegistroGuardado={modalRegistroGuardado}
      />
      <DialogWarning 
        modalWarning={modalWarning}
        setModalWarning={setModalWarning}
        mensajeNoAlbercasEnSedes={mensajeNoAlbercasEnSedes}
      />

        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-4'>
        <h1 className="text-2xl font-bold text-[#245A95] pb-4">ALTA DE PROYECTO</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4 pb-4'>
              {
                userAuth[0]?.perfile.perfil === 'SUBDIRECTOR' ?
                <div 
                    className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer z-49"
                    onClick={() => {
                      setModalCrearEditarProyectos(true) 
                      setProyectoAlbercaSeleccionado(undefined)
                      setSedeSelect('')
                      setClienteSelect('')
                    }}
                >
                  <div className="px-2 py-1 bg-[#E2E2E2]">
                    <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVO PROYECTO</div>
                  </div>
                  <div className="grid place-items-center" style={{ height: '100px' }}>
                    <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                : <></>
              } 
                <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
                  <div className="flex flex-col">
                    <span className='p-float-label relative'>
                      <InputText
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        type="text"
                        value={searchTerm.toUpperCase()}
                        onChange={handleSearch}
                      /> 
                      <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                        <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                      </span>
                      <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Busca el proyecto
                      </label>
                    </span>
                    <p className="text-base text-[#245A95] font-semibold">Puedes buscar el proyecto por el número de proyecto o por su nombre</p>
                  </div>
                </div>
            </div>

            <TableProyectos
              proyectoAlbercaSeleccionado={proyectoAlbercaSeleccionado}
              proyectoAlbercaData={proyectoAlbercaData}
              setProyectoAlbercaSeleccionado={setProyectoAlbercaSeleccionado}
              setModalCrearEditarProyectos={setModalCrearEditarProyectos}
              modalRegistroGuardado={modalRegistroGuardado}
              filterProyectos={filterProyectos}
              setSedeSelect={setSedeSelect}
              setClienteSelect={setClienteSelect}
            />

            <FormProyectos 
              modalCrearEditarProyectos={modalCrearEditarProyectos}
              proyectoAlbercaSeleccionado={proyectoAlbercaSeleccionado}
              setModalCrearEditarProyectos={setModalCrearEditarProyectos}
              setVentanaCarga={setVentanaCarga}
              setModalRegistroGuardado={setModalRegistroGuardado}
              clienteSelect={clienteSelect}
              setClienteSelect={setClienteSelect}
              clientesActivos={clientesActivos}
              sedeSelect={sedeSelect}
              setSedeSelect={setSedeSelect}
              sedes={sedes}
              setMensajeNoAlbercasEnSedes={setMensajeNoAlbercasEnSedes}
              setModalWarning={setModalWarning}
            />
        </div>
    </>
  )
}
