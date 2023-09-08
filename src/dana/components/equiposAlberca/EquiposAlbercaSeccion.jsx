import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useState } from 'react'
import { FormAlbercaEquipo } from '../alberca/FormAlbercaEquipo'
import { BombeoForm } from './BombeoForm'
import { FiltradoForm } from './FiltradoForm'
import { CalentamientoForm } from './CalentamientoForm'
import { DosificadorForm } from './DosificadorForm'
import { api } from '../../helpers/variablesGlobales'
import { VentanaCarga } from '../../../ui/components/VentanaCarga'
import { DialogRegistroGuardado } from '../../../ui/components/DialogRegistroGuardado'
import { ControladorForm } from './ControladorForm'
import { TarjetaEquiposProyecto } from './TarjetaEquiposProyecto'

const tiposEquipos = [
  { label: 'BOMBEO', value: 'BOMBEO' },
  { label: 'CALENTAMIENTO', value: 'CALENTAMIENTO' },
  { label: 'CONTROLADOR', value: 'CONTROLADOR' },
  { label: 'DOSIFICADOR', value: 'DOSIFICADOR' },
  { label: 'FILTRADO', value: 'FILTRADO' },
]
export const EquiposAlbercaSeccion = () => {

  const [sedes, setSedes] = useState([]);
  const [albercas, setAlbercas] = useState([]);
  const [sedeSelected, setSedeSelected] = useState({});
  const [albercaSelected, setAlbercaSelected]  = useState({});
  const [equipoSelected, setEquipoSelected] = useState('');
  const [ventanaCarga, setVentanaCarga] = useState(false);
  const [modalRegistroGuardado, setModalRegistroGuardado] = useState(false);
  const [selectSede, setSelectSede] = useState(null);
  const [selectAlberca, setSelectAlberca] = useState(null);
  const [selectEquipo, setSelectEquipo ] = useState(null); 

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/albercas`);
        const jsonData = await response.json();
        setAlbercas(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  console.log(albercas)
  return (
    <>
        {ventanaCarga && (
          <VentanaCarga/>
        )}

        <DialogRegistroGuardado setModalRegistroGuardado={setModalRegistroGuardado} modalRegistroGuardado={modalRegistroGuardado}/>
        <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden mb-4'>
        <h1 className="text-2xl font-bold text-[#245A95] pb-4">ALTA DE EQUIPOS DE ALBERCAS</h1>
            <div className='grid grid-cols-7 gap-8 m-4 pb-4'>
                <div 
                    className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                    onClick={(e) => {setSelectSede(e)}}
                >
                    <div className="px-6 py-2 bg-[#E2E2E2]">
                      <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">NUEVO EQUIPO</div>
                    </div>
                    <div className="grid place-items-center" style={{ height: '100px' }}>
                      <i className="pi pi-plus-circle text-[#245A95] inset-0 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                </div>
                {
                  selectSede != null && 
                  <div className="p-inputgroup mb-5 mt-8 col-span-2">
                    <div className="flex flex-col">
                      <span className='p-float-label relative'>
                          <Dropdown
                                className="w-full max-w-full appearance-none focus:outline-none bg-transparent"
                                name="selectsede"
                                value={sedeSelected}
                                options={sedes}
                                optionLabel='nombre'
                                filter
                                onChange={(e) => {setSedeSelected(e.target.value), setSelectAlberca(e)}}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Selecciona la sede
                          </label>
                      </span>
                      <p className="text-sm text-[#245A95] font-semibold">1.- Selecciona la sede para filtrar sus albercas</p>
                    </div>
                </div>
                }
                {
                  selectAlberca != null && 
                  <div className="p-inputgroup mb-5 mt-8 col-span-2">
                    <div className="flex flex-col">
                      <span className='p-float-label relative'>
                          <Dropdown
                                className="w-full appearance-none focus:outline-none bg-transparent"
                                name="selectalberca"
                                value={albercaSelected}
                                options={albercas.filter(alberca => alberca.estatus === "ACTIVO" && alberca.sede.nombre === sedeSelected.nombre)}
                                optionLabel='nombrealberca'
                                disabled={albercas.filter(alberca => alberca.estatus === "ACTIVO" && alberca.sede.nombre === sedeSelected.nombre).length === 0}
                                filter
                                onChange={(e) => {setAlbercaSelected(e.target.value), setSelectEquipo(e.target.value)}}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Selecciona la alberca
                          </label>
                      </span>
                      <p className="text-sm text-[#245A95] font-semibold">2.- Selecciona la alberca a la que deseas asignar un nuevo equipo</p>
                    </div>
                  </div>
                }
                {
                  selectEquipo != null &&
                  <div className="p-inputgroup mb-5 mt-8 col-span-2">
                    <div className="flex flex-col">
                      <span className='p-float-label relative'>
                          <Dropdown
                                className="w-full appearance-none focus:outline-none bg-transparent"
                                name="selectalberca"
                                value={equipoSelected}
                                options={tiposEquipos}
                                optionLabel='label'
                                filter
                                onChange={(e) => {setEquipoSelected(e.target.value)}}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Selecciona el tipo de quipo
                          </label>
                      </span>
                      <p className="text-sm text-[#245A95] font-semibold">3.- Selecciona el tipo de quipo que quieres agregar</p>
                    </div>
                </div>
                }
            </div>

            <TarjetaEquiposProyecto/>
            {
              equipoSelected === 'BOMBEO' && (
                <BombeoForm
                  albercaSelected={albercaSelected}
                  setVentanaCarga={setVentanaCarga}
                  setModalRegistroGuardado={setModalRegistroGuardado}
                />
              )
            }
            {
              equipoSelected === 'FILTRADO' && (
                <FiltradoForm
                  albercaSelected={albercaSelected}
                  setVentanaCarga={setVentanaCarga}
                  setModalRegistroGuardado={setModalRegistroGuardado}
                />
              )
            }
            {
              equipoSelected === 'CALENTAMIENTO' && (
                <CalentamientoForm
                  albercaSelected={albercaSelected}
                  setVentanaCarga={setVentanaCarga}
                  setModalRegistroGuardado={setModalRegistroGuardado}
                />
              )
            }
            {
              equipoSelected === 'DOSIFICADOR' && (
                <DosificadorForm
                  albercaSelected={albercaSelected}
                  setVentanaCarga={setVentanaCarga}
                  setModalRegistroGuardado={setModalRegistroGuardado}
                />
              )
            }
            {
              equipoSelected === 'CONTROLADOR' && (
                <ControladorForm
                  albercaSelected={albercaSelected}
                  setVentanaCarga={setVentanaCarga}
                  setModalRegistroGuardado={setModalRegistroGuardado}
                />
              )
            }  
        </div>
    </>
  )
}
