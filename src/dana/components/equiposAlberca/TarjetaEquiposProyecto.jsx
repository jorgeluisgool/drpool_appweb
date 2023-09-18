import React, { useEffect, useState } from 'react'
import { api } from '../../helpers/variablesGlobales';
import { Dropdown } from 'primereact/dropdown';
import { ModalDetalleEquipo } from './ModalDetalleEquipo';

export const TarjetaEquiposProyecto = ({albercaSelected, equipoSelected, tiposEquipos, setEquipoSelected, modalRegistroGuardado}) => {

  const [equiposBomba, setEquiposBomba] = useState();
  const [equiposFiltrado, setEquiposFiltrado] = useState();
  const [equiposCalentamiento, setEquiposCalentamiento] = useState();
  const [equiposDosificador, setEquiposDosificador] = useState();
  const [equiposControlador, setEquiposControlador] = useState();
  const [botonNuevaSede, setBotonNuevaSede ] = useState(null);
  const [modalDetalleEquipo, setModalDetalleEquipo] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState({});

  useEffect(() => {
    setBotonNuevaSede(null);
    setEquipoSelected('')
  }, [albercaSelected]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/equipobomba`);
        const jsonData = await response.json();
        setEquiposBomba(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [modalRegistroGuardado]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/equipofiltrado`);
        const jsonData = await response.json();
        setEquiposFiltrado(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [modalRegistroGuardado]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/equipocalentamiento`);
        const jsonData = await response.json();
        setEquiposCalentamiento(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [modalRegistroGuardado]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/equipodosificador`);
        const jsonData = await response.json();
        setEquiposDosificador(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [modalRegistroGuardado]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/equipocontrolador`);
        const jsonData = await response.json();
        setEquiposControlador(jsonData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [modalRegistroGuardado]);

  const equiposbombasfiltradas = equiposBomba?.filter((equiBomba) => (equiBomba.alberca?.nombrealberca === albercaSelected?.nombrealberca));
  const equiposFiltroFiltradas = equiposFiltrado?.filter((equiFiltro) => (equiFiltro.alberca?.nombrealberca === albercaSelected?.nombrealberca));
  const equiposCalentamientoFiltradas = equiposCalentamiento?.filter((equiCalentamiento) => (equiCalentamiento.alberca?.nombrealberca === albercaSelected?.nombrealberca));
  const equiposDosificadorFiltradas = equiposDosificador?.filter((equiDosificador) => (equiDosificador.alberca?.nombrealberca === albercaSelected?.nombrealberca));
  const equiposControladorControlador = equiposControlador?.filter((equiControlador) => (equiControlador.alberca?.nombrealberca === albercaSelected?.nombrealberca));
  return (
    <>
      <ModalDetalleEquipo 
        modalDetalleEquipo={modalDetalleEquipo}
        setModalDetalleEquipo ={setModalDetalleEquipo}
        equipoSeleccionado={equipoSeleccionado}
      />

        <div className="mb-6 transition duration-500 ease-in-out hover:shadow-2xl relative w-full max-w-full rounded overflow-hidden shadow-lg group">
        <h1 className='text-2xl font-bold text-[#245A95]'>EQUIPOS</h1>
          <div className='grid grid-cols-6'>
            <h1 className='col-span-6 text-2xl font-bold text-center'>{albercaSelected?.nombrealberca ?? ''}</h1>
          </div>
          <div className='grid grid-cols-6 justify-center'>
            <h1 className='col-span-6 text-lg font-bold text-center text-[#245A95]'>{albercaSelected?.tipoalberca ?? ''}</h1>
          </div>
          <div className="grid grid-cols-6 border m-2">
            <div className="p-4 border">
              <div className="flex flex-col items-center">
                <img className="h-48 w-full object-cover md:w-48" src={albercaSelected?.sede?.cliente?.urllogo ?? ''} alt="Random image" />
                <h1 className='text-md font-bold text-center text-[#245A95] mt-2'>{albercaSelected?.sede?.nombre ?? ''}</h1>
              </div>
            </div>

            <div className="p-4">
              <div className="uppercase tracking-wide text-lg text-[#245A95] font-semibold">Bombeo</div>
                {
                  equiposbombasfiltradas?.map((equipoBomba) => 
                  <div className='text-xs font-medium hover:text-[#245A95] hover:font-semibold cursor-pointer' onClick={() => {setModalDetalleEquipo(true), setEquipoSeleccionado(equipoBomba)}}>
                    <li key={equipoBomba.idbomba}>{equipoBomba.numero}</li>
                  </div>
                  )
                } 
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-lg text-[#245A95] font-semibold">Filtrado</div>
                {
                  equiposFiltroFiltradas?.map((equipoFiltro) => 
                    <div className='text-xs font-medium hover:text-[#245A95] hover:font-semibold cursor-pointer' onClick={() => {setModalDetalleEquipo(true), setEquipoSeleccionado(equipoFiltro)}}>
                      <li key={equipoFiltro.idfiltro}>{equipoFiltro.numero}</li>
                    </div>
                  )
                }
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-lg text-[#245A95] font-semibold">Calentamiento</div>
                {
                  equiposCalentamientoFiltradas?.map((equipoCalentamiento) => 
                    <div className='text-xs font-medium hover:text-[#245A95] hover:font-semibold cursor-pointer' onClick={() => {setModalDetalleEquipo(true), setEquipoSeleccionado(equipoCalentamiento)}}>
                      <li key={equipoCalentamiento.idcalentamiento}>{equipoCalentamiento.numero}</li>
                    </div>
                  )
                } 
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-lg text-[#245A95] font-semibold">Dosificador</div>
              {
                equiposDosificadorFiltradas?.map((equipoDosificador) => 
                  <div className='text-xs font-medium hover:text-[#245A95] hover:font-semibold cursor-pointer' onClick={() => {setModalDetalleEquipo(true), setEquipoSeleccionado(equipoDosificador)}}>
                    <li key={equipoDosificador.iddosificador}>{equipoDosificador.numero}</li>
                  </div>
                )
              }
            </div>
            <div className="p-4">
              <div className="uppercase tracking-wide text-lg text-[#245A95] font-semibold">Controlador</div>
              {
                equiposControladorControlador?.map((equipoControlador) => 
                  <div className='text-xs font-medium hover:text-[#245A95] hover:font-semibold cursor-pointer' onClick={() => {setModalDetalleEquipo(true), setEquipoSeleccionado(equipoControlador)}}>
                    <li key={equipoControlador.idcontrolador}>{equipoControlador.numero}</li>
                  </div>
                )
              }
            </div>  
          </div>
          {
            botonNuevaSede === null &&
            <div className="mb-5 mt-8 px-2 cursor-pointer inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
              <button
                  type="submit"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  onClick={(e) => {setBotonNuevaSede(e)}}
              >
                  <ion-icon name="add-outline"></ion-icon>Agregar equipo
              </button>
            </div>
          }
          
          {
            botonNuevaSede !== null &&
            <div className="justify-end p-inputgroup mb-5 mt-8 col-span-2 px-2">
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
                      Tipo de quipo
                    </label>
                </span>
                <p className="text-sm text-[#245A95] font-semibold">3.- Selecciona el tipo de quipo que quieres agregar</p>
              </div>
          </div>
          }
          
        </div>
    </>
  )
}
