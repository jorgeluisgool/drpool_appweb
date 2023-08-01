import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AcordionSubCampos from './AcordionSubCampos';
import { ExampleContex } from '../context/ExampleContext';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { DndContext, closestCenter } from '@dnd-kit/core';

/// COMPONENTE ///
const AcordionCampos = ({ arreglo2, dataArchivoExcel, data, index, setDataArchivoExcel}) => {

  // const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);


  // Estado para abrir y cerrar el acordion principal
  const [show, setShow] = useState(null);

  // Funcion para abrir y cerrar el acordion principal
  const toggleShow = (index) => {
    if (index === show) {
      setShow(null)
    } else {
      setShow(index)
    }
  }

  // Funcion que reordena el sub acordion
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsCopy = Array.from(arregloSub);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setArregloSub(itemsCopy);
    console.log(result);
  };

  // const agrupaciones = dataArchivoExcel
  //   .map((item) => item.agrupacion)
  //   .filter((value, index, self) => self.indexOf(value) === index);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: data.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    
    // console.log(active.id)
    // console.log(over.id)

    const oldIndex = dataArchivoExcel[index].campos.findIndex(element => element.id === active.id);
    const newIndex = dataArchivoExcel[index].campos.findIndex(element => element.id === over.id);
    
    const newOrder = arrayMove(dataArchivoExcel[index].campos, oldIndex, newIndex);
    let nuevaLista=[];


    for (let i = 0; i < dataArchivoExcel.length; i++) {
      if(index != i){
        nuevaLista[i]= dataArchivoExcel[i];
      }else{
        nuevaLista[i]= {...dataArchivoExcel[i], campos: newOrder };
      }
      
    }
     setDataArchivoExcel(nuevaLista)
     console.log(nuevaLista)
  }

  const agregarCampo = () => {
    let lista = [...dataArchivoExcel];
    const idNuevo = dataArchivoExcel[index].campos.length + 1

    const nuevoCampo = {
      id: `${idNuevo}`,
      longitud: '',
      nombreCampo: 'Nuevo campo',
      restriccion: '',
      tipoCampo: ''
    }

    lista[index].campos = [...lista[index].campos, nuevoCampo];
    setDataArchivoExcel(lista);
  }

  return (
    <>
      {/* DndContext del sub acordion */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div
          style={style}
          ref={setNodeRef}
          {...attributes}
          className="hs-accordion-group bg-slate-50 px-5 py-2 my-3 rounded-2xl border-2 border-[#245A95] shadow-[#245A95] shadow-md"
        >
          <span className='absolute right-8 text-2xl text-[#245A95] ' {...listeners}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </span>
          <div className="hs-accordion active" id="hs-basic-nested-heading-one">
          <div className="flex items-center justify-around">
            <div
              onClick={() => toggleShow(index)}
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full text-left text-gray-800 transition text-lg font-black hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-nested-collapse-one"
            >
              <div className={`text-2xl text-[#245A95] ${show === index ? "rotate-180" : ""}`}>
                <ion-icon name="chevron-down"></ion-icon>
              </div>
              {data.agrupacion}
            </div>
            <div className='pr-10'>
              <button
                type="submit"
                onClick={agregarCampo}
                className="ml-auto w-auto h-10 object-cover active:scale-[.98] bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-sm font-bold inline-flex items-center rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                <span className='text-3xl'><ion-icon name="add-circle"></ion-icon></span>
                <span className="ml-1">Agregar campo</span>
              </button>
            </div>
          </div>
            
            {show === index && (
              <SortableContext
                items={data.campos}
                strategy={verticalListSortingStrategy}
              >
                {
                  data.campos.map((item, ind) => (
                    <AcordionSubCampos key={ind} data={item} index={ind} indPadre={index} />
                  ))
                }
              </SortableContext>
            )}
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default AcordionCampos







