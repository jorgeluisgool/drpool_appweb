import React, { useContext, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { ExampleContex } from '../context/ExampleContext';
import { RadioButton } from 'primereact/radiobutton';
import { Field, Form, Formik } from 'formik';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const tipoCampos = [
  { tipo: 'ALFANUMERICO', label: 'ALFANUMÉRICO' },
  { tipo: 'ALFABETICO', label: 'ALFABÉTICO' },
  { tipo: 'NUMERICO', label: 'NUMÉRICO' },
  { tipo: 'CORREO', label: 'CORREO' },
  { tipo: 'CATALOGO', label: 'CATALOGO' },
  { tipo: 'FIRMA', label: 'FIRMA' },
  { tipo: 'FOTO', label: 'FOTO' },
  { tipo: 'CALENDARIO', label: 'CALENDARIO' },
  { tipo: 'HORA', label: 'HORA' },
  { tipo: 'CHECKBOX', label: 'CHECKBOX' },
  { tipo: 'CHECKBOX-EVIDENCIA', label: 'EVIDENCIAS' },
  { tipo: 'CODIGO', label: 'LECTOR DE CÓDIGO' }, 
];

/// COMPONETE ///
const AcordionSubCampos = ({data, acordionEstate, index,indPadre}) => {

  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);

  // Estado para abrir y cerrar el sub acordion 
  const [showSub, setShowSub] = useState(null);

  // Funcoion para abrir y cerrar el sub acordion
  const toggleShow = (index) => {
    if (index === showSub) {
      setShowSub(null)
    } else {
      setShowSub(index)
    }
  };

  // const camposOrdenados = arreglo2[1].campos.sort((a,b) => {
  //   return a.campo.localeCompare(b.campo);
  // });

  // console.log(camposOrdenados);

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

  const eliminarCampo = (index) => {
    const newDataArchivoExcel = [...dataArchivoExcel];
    const lista = newDataArchivoExcel[indPadre].campos.filter(element => element.id != newDataArchivoExcel[indPadre].campos[index].id); 
    const nuevaLista = []; 
    
    for (let i = 0; i < dataArchivoExcel.length; i++) {
      if(indPadre != i){
        nuevaLista[i]= dataArchivoExcel[i];
      }else{
        nuevaLista[i]= {...dataArchivoExcel[i], campos: lista };
      }
      
    }
    
    setDataArchivoExcel(nuevaLista); 
  }

  return (
    <>  
      {/* { data.campos.map((acor, index) => ( */}
        <div 
          style={style}
          ref={setNodeRef}
          {...attributes}
          className="bg-[#e2e2e2] rounded hs-accordion mt-2 mb-4 shadow-slate-400 shadow-md"
        >
          <span className='absolute right-12 text-xl text-[#245A95]' {...listeners}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </span>
          <div className='flex items-center justify-around'>
            <div onClick={() => toggleShow(index)} className="rounded p-4 hs-accordion-toggle hs-accordion-active:text-blue-600 py-1 inline-flex items-center gap-x-2 w-full font-black text-left text-[#245A95] text-xl transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-one">
              <div className={`text-2xl text-[#245A95] p-2 right-12 ${showSub ? "rotate-180" : ""}`}>
                <ion-icon name="chevron-down"></ion-icon>
              </div>
                {data.nombreCampo}   
            </div>
            <div className='pr-10'>
              <button
                type="submit"
                onClick={() => eliminarCampo(index)}
                className="ml-auto h-10 w-10 object-cover active:scale-[.98] bg-transparent hover:bg-[#BE1622] hover:text-white text-[#BE1622] text-sm font-bold inline-flex items-center rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                <span className='text-2xl'>
                  <ion-icon name="trash"></ion-icon>
                </span>
                <span className="ml-1"></span>
              </button>
            </div>
          </div>
          
          {
            showSub === index && (
              <Formik
                initialValues={dataArchivoExcel}

                onSubmit={(valores,) => {

                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                <div id="hs-basic-nested-sub-collapse-one" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4 border-2 border-slate-100 hs-accordion-content w-full overflow-hidden transition-[height] duration-500" aria-labelledby="hs-basic-nested-sub-heading-one"> 
                  <div className='mt-2 flex flex-col gap-y-4'>
                    
                      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 space-y-1">
                      
                        <div className='p-inputgroup flex-1'>
                          <span className='p-float-label relative'>
                            {/* {tipoCampos.map((tipo) => (
                              <div key={tipo.tipo} className="flex items-center gap-x-2">
                                <Field
                                  type="radio"
                                  id={tipo.tipo}
                                  name={`dataArchivoExcel[${indPadre}].campos[${index}].tipocampo`}
                                  value={tipo.tipo}
                                  checked={values.dataArchivoExcel && values.dataArchivoExcel[indPadre]?.campos?.[index]?.tipocampo === tipo.tipo}
                                  onChange={handleChange}
                                  as={RadioButton}
                                />
                                <label htmlFor={tipo.tipo} className="text-lg text-[#245A95] font-semibold">{tipo.label}</label>
                              </div>
                            ))} */}
                            <Field
                              as={Dropdown}
                              className="w-full appearance-none focus:outline-none"
                              name={`dataArchivoExcel[${indPadre}].campos[${index}].tipoCampo`}
                              options={tipoCampos}
                              optionLabel="label"
                              filter
                              onChange={(e) => {
                                const newDataArchivoExcel = [...dataArchivoExcel];
                                newDataArchivoExcel[indPadre].campos[index].tipoCampo =
                                  e.value.tipo;
                                setDataArchivoExcel(newDataArchivoExcel);
                              }}
                              value={values.dataArchivoExcel?.[indPadre]?.campos?.[index]?.tipoCampo || ''}
                            />
                            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                              <i className="pi pi-file-edit text-[#245A95] font-bold text-xl"></i>
                            </span>
                            <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                              Tipo campo:
                            </label>
                          </span>
                        </div>
                      </div>
                    </div>
                      {/* Inputs de campos proyecto */}
                      <div className='mt-2 flex flex-col gap-y-7'>
                        <div className="p-inputgroup">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none"
                                    as={InputText}
                                    name="nombreCampo"
                                    value={dataArchivoExcel[indPadre].campos[index].nombreCampo}
                                    onChange={(e) => {
                                      const newDataArchivoExcel = [...dataArchivoExcel];
                                      newDataArchivoExcel[indPadre].campos[index].nombreCampo = e.target.value;
                                      setDataArchivoExcel(newDataArchivoExcel);
                                    }}
                                />

                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-xl"></i>
                                </span>
                                <label htmlFor="nombreCampo" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Campo
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none"
                                    as={InputText}
                                    name="restriccion"
                                    value={dataArchivoExcel[indPadre].campos[index].restriccion}
                                    onChange={(e) => {
                                      const newDataArchivoExcel = [...dataArchivoExcel];
                                      newDataArchivoExcel[indPadre].campos[index].restriccion = e.target.value;
                                      setDataArchivoExcel(newDataArchivoExcel);
                                    }}
                                />  
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-xl"></i>
                                </span>
                                <label htmlFor="restriccion" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                Restricció
                                </label>
                            </span>
                        </div>
                        <div className="p-inputgroup">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none"
                                    as={InputText}
                                    name="tamano"
                                    value={dataArchivoExcel[indPadre].campos[index].longitud}
                                    onChange={(e) => {
                                      const newDataArchivoExcel = [...dataArchivoExcel];
                                      newDataArchivoExcel[indPadre].campos[index].longitud = e.target.value;
                                      setDataArchivoExcel(newDataArchivoExcel);
                                    }}
                                />  
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-xl"></i>
                                </span>
                                <label htmlFor="tamano" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Tamaño
                                </label>
                            </span>
                        </div>
                      </div>
                </div>
                </Form>
                )}
              </Formik>
            )
          }   
      </div> 
      {/* ))
      } */}
    </>
  )
}

export default AcordionSubCampos