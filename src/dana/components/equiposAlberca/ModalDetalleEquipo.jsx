import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { BombeoForm } from './BombeoForm';
import {FiltradoForm} from './FiltradoForm'
import {DosificadorForm} from './DosificadorForm'
import { addLocale } from 'primereact/api';
import { CalentamientoForm } from './CalentamientoForm';
import { ControladorForm } from './ControladorForm';
import { format, parse } from 'date-fns';

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });


export const ModalDetalleEquipo = ({modalDetalleEquipo, setModalDetalleEquipo, equipoSeleccionado, albercaSelected, setVentanaCarga, editFields, setEditFields}) => {

    const [editForm, setEditForm] = useState(false);
    

    const parseDate = (dateString) => {
        if (typeof dateString === "string") {
            const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
            return parsedDate.toLocaleDateString('es');
        } else {
            return dateString
        }  
      };

      console.log(equipoSeleccionado)

  return (
    <Dialog header={equipoSeleccionado.numero} visible={modalDetalleEquipo} baseZIndex={-1} style={{ width: '85vw', height: '45vw' }} onHide={() => {setModalDetalleEquipo(false); setEditForm(false)}} className='pt-20'>
        {
        equipoSeleccionado.tipoequipo === 'BOMBEO' &&  
        <div className="max-w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-full">
            {/* <div className="pl-2 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Card subtitle</div> */}
            {!editForm &&
            (<div>
            <div className="md:flex pt-3">
              <div className="px-4">
                  <p className='text-black text-lg font-bold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus}</span></p>
              </div>
              <div className="px-4">
              <p className='text-black text-lg font-bold'>Fecha de último mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento)).toLocaleDateString() : '' }</span></p>

              </div>
            </div>
          <div className='border'>
                <div className="md:flex pt-3">
                  <div className="px-4">
                      <p className='text-black font-semibold'>Potencia de la bomba: <span className='text-slate-600'>{equipoSeleccionado.potencia}</span></p>
                  </div>
                  <div className="px-4">
                      <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marca}</span></p>
                  </div>
                  <div className="px-4">
                      <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelo}</span></p>
                  </div>
                  <div className="px-4">
                      <p className='text-black font-semibold'>Corriente nominal: <span className='text-slate-600'>{equipoSeleccionado.capacidad}</span></p>
                  </div>
                </div>
                <div className="md:flex pt-3">
                  <div className="px-4">
                      <p className='text-black font-semibold'>Voltaje: <span className='text-slate-600'>{equipoSeleccionado.voltaje}</span></p>
                  </div>
                  <div className="px-4">
                      <p className='text-black font-semibold'>Número de fases: <span className='text-slate-600'>{equipoSeleccionado.numerofases}</span></p>
                  </div>
                </div>
                <div className="md:flex pt-5">
                  <div className="px-4">
                      <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones}</span></p>
                  </div>
                </div>
          </div>
          </div>
          )}

          {editForm && (<BombeoForm equipoSeleccionado = {equipoSeleccionado} idbomba = {equipoSeleccionado.idbomba} albercaSelected={albercaSelected} setVentanaCarga={setVentanaCarga} equipoSelected={equipoSeleccionado.tipoequipo} setModalDetalleEquipo={setModalDetalleEquipo} editFields={editFields} setEditFields={setEditFields}></BombeoForm>)}
          <div className="cursor-pointer absolute inset-x-0 bottom-4 left-6 flex gap-3 justify-start">
                <button
                    type="submit"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={()=> setEditForm(!editForm)}
                >
                    <ion-icon name="create-outline"></ion-icon> {!editForm ? <span>Editar</span> : <span>No editar</span>}
                </button>
            </div>

           
        </div>
        }

{console.log(equipoSeleccionado)}
        {
            
        equipoSeleccionado.tipoequipo === 'FILTRADO' &&  
        <div className="max-w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-full">
            
          {/* <div className="md:flex pt-3">
            <div className="px-4">
                <p className='text-black text-lg font-bold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus}</span></p>
            </div>
            <div className="px-4">
                <p className='text-black text-lg font-bold'>Fecha de último mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento}</span></p>
            </div>
          </div> */}
          {!editForm &&
          (<div className='border'>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Arena</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcaarena}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modeloarena}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de arena: <span className='text-slate-600'>{equipoSeleccionado.cantidadarena}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de grava: <span className='text-slate-600'>{equipoSeleccionado.cantidadgravaarena}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad maxima: <span className='text-slate-600'>{equipoSeleccionado.cantidadmaxarena}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus_arena}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Fecha de ultimo mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento_arena ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento_arena)).toLocaleDateString() : '' }</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones_arena}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Zeolita</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcazeolita}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelozeolita}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de arena: <span className='text-slate-600'>{equipoSeleccionado.cantidadzeolita}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de grava: <span className='text-slate-600'>{equipoSeleccionado.cantidadgravazeolita}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad maxima: <span className='text-slate-600'>{equipoSeleccionado.cantidadmaxzeolita}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus_zeolita}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Fecha de ultimo mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento_zeolita ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento_zeolita)).toLocaleDateString() : '' }</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones_zeolita}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Cartucho</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcacartucho}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelocartucho}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de arena: <span className='text-slate-600'>{equipoSeleccionado.cantidadcartucho}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de grava: <span className='text-slate-600'>{equipoSeleccionado.cantidadgravacartucho}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad maxima: <span className='text-slate-600'>{equipoSeleccionado.cantidadmaxcartucho}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus_cartucho}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Fecha de ultimo mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento_cartucho ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento_cartucho)).toLocaleDateString() : '' }</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones_cartucho}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Esponja vidrio/otra</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcaesponja}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modeloesponja}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de arena: <span className='text-slate-600'>{equipoSeleccionado.cantidadesponja}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad de grava: <span className='text-slate-600'>{equipoSeleccionado.cantidadgravaesponja}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Cantidad maxima: <span className='text-slate-600'>{equipoSeleccionado.cantidadmaxesponja}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus_esponja}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Fecha de ultimo mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento_esponja ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento_esponja)).toLocaleDateString() : '' }</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones_esponja}</span></p>
              </div>
            </div>
            <div className="md:flex pt-5">
              {/* <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones}</span></p>
              </div> */}
            </div>
          </div>)
          }
          { editForm && <FiltradoForm equipoSeleccionado = {equipoSeleccionado} idfiltro={equipoSeleccionado.idfiltro} albercaSelected={albercaSelected} setVentanaCarga={setVentanaCarga} equipoSelected={equipoSeleccionado.tipoequipo}></FiltradoForm>} 
          <div className="cursor-pointer absolute inset-x-0 bottom-4 left-6 flex gap-3 justify-start">
                <button
                    type="submit"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={()=> setEditForm(!editForm)}
                >
                    <ion-icon name="create-outline"></ion-icon> {!editForm ? <span>Editar</span> : <span>No editar</span>}
                </button>
            </div>
        </div>
        }

        {
            
        equipoSeleccionado.tipoequipo === 'CALENTAMIENTO' &&  
        <div className="max-w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-full">
             {!editForm && (<div>
                <div className="md:flex pt-3">
            <div className="px-4">
                <p className='text-black text-lg font-bold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus}</span></p>
            </div>
            <div className="px-4">
                <p className='text-black text-lg font-bold'>Fecha de último mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento)).toLocaleDateString() : '' }</span></p>
            </div>
          </div>
          <div className='border'>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Bomba de calor</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcabomba}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelobomba}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Corriente nominal: <span className='text-slate-600'>{equipoSeleccionado.capacidadbomba}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Voltaje: <span className='text-slate-600'>{equipoSeleccionado.voltajebomba}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Número de fases: <span className='text-slate-600'>{equipoSeleccionado.numerofasesbomba}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Caldera</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcacaldera}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelocaldera}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Capacidad: <span className='text-slate-600'>{equipoSeleccionado.capacidadcaldera}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Combustible: <span className='text-slate-600'>{equipoSeleccionado.combustiblecaldera}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Colector solar</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcacolector}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelocolector}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Número de paneles: <span className='text-slate-600'>{equipoSeleccionado.numeropaneles}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Intercambiador de calor</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Número: <span className='text-slate-600'>{equipoSeleccionado.numerointercambiador}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelointercambiador}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Capacidad: <span className='text-slate-600'>{equipoSeleccionado.capacidadintercambiador}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Información complementaria: <span className='text-slate-600'>{equipoSeleccionado.informacionintercambiador}</span></p>
              </div>
            </div>
            <div className="md:flex pt-5">
              <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones}</span></p>
              </div>
            </div>
          </div>
             </div>)}
            

           {editForm && (<CalentamientoForm equipoSeleccionado = {equipoSeleccionado} idcalentamiento = {equipoSeleccionado.idcalentamiento} albercaSelected={albercaSelected} setVentanaCarga={setVentanaCarga} equipoSelected={equipoSeleccionado.tipoequipo}></CalentamientoForm>)}
          <div className="cursor-pointer absolute inset-x-0 bottom-4 left-6 flex gap-3 justify-start">
                <button
                    type="submit"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={()=> setEditForm(!editForm)}
                >
                    <ion-icon name="create-outline"></ion-icon> {!editForm ? <span>Editar</span> : <span>No editar</span>}
                </button>
            </div>
        </div>

        
        }

{
        equipoSeleccionado.tipoequipo === 'DOSIFICADOR' &&  
        <div className="max-w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-full">
            {!editForm && <div>
                <div className="md:flex pt-3">
            <div className="px-4">
                <p className='text-black text-lg font-bold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus}</span></p>
            </div>
            <div className="px-4">
                <p className='text-black text-lg font-bold'>Fecha de último mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento)).toLocaleDateString() : '' }</span></p>
            </div>
          </div>
          <div className='border'>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Solido</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcasolido}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelosolido}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Pastilla: <span className='text-slate-600'>{equipoSeleccionado.pastillasolido}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Liquido</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcaliquido}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modeloliquido}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Flujo Maximo: <span className='text-slate-600'>{equipoSeleccionado.flujoliquido}</span></p>
              </div>
            </div>
            <h1 className="pl-4 pt-4 uppercase tracking-wide text-lg text-[#245A95] font-semibold">Clorador salino</h1>
            <div className="md:flex">
              <div className="px-4">
                  <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcaclorador}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modeloclorador}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black font-semibold'>Capacidad maxima: <span className='text-slate-600'>{equipoSeleccionado.capacidadmaxclorador}</span></p>
              </div>
            </div>
            <div className="md:flex pt-5">
              <div className="px-4">
                  <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones}</span></p>
              </div>
            </div>
          </div>
                </div>}
          
          {editForm && (<DosificadorForm equipoSeleccionado = {equipoSeleccionado} iddosificador = {equipoSeleccionado.iddosificador} albercaSelected={albercaSelected} setVentanaCarga={setVentanaCarga} equipoSelected={equipoSeleccionado.tipoequipo}></DosificadorForm>)}
          <div className="cursor-pointer absolute inset-x-0 bottom-4 left-6 flex gap-3 justify-start">
                <button
                    type="submit"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={()=> setEditForm(!editForm)}
                >
                    <ion-icon name="create-outline"></ion-icon> {!editForm ? <span>Editar</span> : <span>No editar</span>}
                </button>
            </div>
        </div>
        }

        {
        equipoSeleccionado.tipoequipo === 'CONTROLADOR' &&  
        <div className="max-w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-full">
            {!editForm && <div>
                <div className="md:flex pt-3">
              <div className="px-4">
                  <p className='text-black text-lg font-bold'>Estatus: <span className='text-slate-600'>{equipoSeleccionado.estatus}</span></p>
              </div>
              <div className="px-4">
                  <p className='text-black text-lg font-bold'>Fecha de último mantenimiento: <span className='text-slate-600'>{equipoSeleccionado.fecha_ultimo_mantenimiento ? parseDate(new Date(equipoSeleccionado.fecha_ultimo_mantenimiento)).toLocaleDateString() : '' }</span></p>
              </div>
            </div>
          <div className='border'>
                <div className="md:flex pt-3">
                  <div className="px-4">
                      <p className='text-black font-semibold'>Marca: <span className='text-slate-600'>{equipoSeleccionado.marcacontrolador}</span></p>
                  </div>
                  <div className="px-4">
                      <p className='text-black font-semibold'>Modelo: <span className='text-slate-600'>{equipoSeleccionado.modelocontrolador}</span></p>
                  </div>
                  <div className="px-4">
                      <p className='text-black font-semibold'>Número de equipos controladores: <span className='text-slate-600'>{equipoSeleccionado.numero_equipos_controladores}</span></p>
                  </div>
                </div>
                <div className="md:flex pt-5">
                  <div className="px-4">
                      <p className='text-black font-semibold'>Observaciones: <span className='text-slate-600'>{equipoSeleccionado.observaciones}</span></p>
                  </div>
                </div>
          </div>
                </div>}
            
          {editForm && (<ControladorForm equipoSeleccionado = {equipoSeleccionado} idcontrolador = {equipoSeleccionado.idcontrolador} albercaSelected={albercaSelected} setVentanaCarga={setVentanaCarga} equipoSelected={equipoSeleccionado.tipoequipo}></ControladorForm>)}
          <div className="cursor-pointer absolute inset-x-0 bottom-4 left-6 flex gap-3 justify-start">
                <button
                    type="submit"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={()=> setEditForm(!editForm)}
                >
                    <ion-icon name="create-outline"></ion-icon> {!editForm ? <span>Editar</span> : <span>No editar</span>}
                </button>
            </div>
        </div>
        }
        
    </Dialog>
  )
}
