import { Field, FieldArray, Form, Formik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useState } from 'react'
import { api } from '../helpers/variablesGlobales'

const opcionesActividades = [
    { label: 'Limpieza de trampas de pelo', value: 'Limpieza de trampas de pelo' },
    { label: 'Retiro de sólidos suspendidos', value: 'Retiro de sólidos suspendidos' },
    { label: 'Retrolavado de filtro', value: 'Retrolavado de filtro' },
    { label: 'Cepillado de paredes y piso', value: 'Cepillado de paredes y piso' },
    { label: 'Aspirado', value: 'Aspirado' },
    { label: 'Limpieza de cenefa', value: 'Limpieza de cenefa' },
    { label: 'Limpieza de la rejilla perimetral', value: 'Limpieza de la rejilla perimetral' },
    { label: 'Limpieza de área perimetral', value: 'Limpieza de área perimetral' },
    { label: 'Otro', value: 'otro' },
];

// const opcionesTextoImagenes = [
//     { label2: 'Limpieza de trampas', value: 'El operador de mantenimiento de la piscina tiene que destapar la trampa de pelo para su limpieza cada vez que realice el aspirado, ya que, es el que protege a la motobomba de obstrucciónes y evita que los sólidos de tamaño grande y mediano entren en ella.' },
//     { label2: 'Retiro de sólidos', value: 'Al inicio de las actividades y a lo largo del día el operador de mantenimiento de la piscina se encuentra al pendiente de retirar los sólidos flotantes, suspendidos y sedimentados que estén dentro de la alberca. La mayoría de ellos están conformados por hojas, insectos o artículos de los usuarios; en albercas techadas y al aire libre. Dependiendo del tipo de sólidos que contaminen la alberca con mayor frecuencia, el operador decidirá si le es más práctico usar una red de pala o tipo bolsa.' },
//     { label2: 'Retrolavado', value: 'Es muy importante que el operador de mantenimiento de la piscina lo haga semanalmente, porque es la forma en la que el filtro se limpia, cuando el operador haga un retro lavado mire el color del agua del pequeño visor de vidrio (frasco o burbuja), inicialmente el agua pasara sucia hasta ponerse transparente, este proceso debería de llevar menos de cinco minutos pero la claridad del agua es el mejor indicio.' },
//     { label2: 'Cepillado', value: 's de suma importancia realizar el cepillado de las paredes y piso de la piscina para evitar la formación de biopelícula, generada principalmente por la formación de colonias de bacterias, algas y hongos. Adicionalmente también sirve para eliminar la suciedad pegada en las paredes.' },
//     { label2: 'Aspirado', value: 'En la piscina también es muy común encontrar sólidos precipitados, que son partículas que no se disuelven en agua, y que por su tamaño y peso se depositan en el fondo, tales como pequeñas piedras, arena, hojas podridas, insectos, monedas, pasadores, etcétera. Todos estos sólidos deberán ser removidos utilizando el sistema de aspirado, que está compuesto por el cabezal de aspirado, maneral, manguera y línea de aspirado (tubería de succión). Los aspirados se realizan lento, para poder atrapar los sólidos de menor tamaño que por lo general son muy ligeros, ya que aspirar a una velocidad mayor provocará que los sólidos que ya habían logrado sedimentar, se dispersen de nuevo.' },
//     { label2: 'Limpieza cenefa', value: 'En piscinas que no tienen rejilla de rebosamiento, y que por tanto no pueden ser completamente llenas con agua, siempre se forma una línea perimetral oscura sobre el azulejo, como resultado de todos los contaminantes insolubles que flotan en el agua (grasa corporal, productos para el cabello, cremas, maquillaje, protector solar, entre otros). Para eliminar esta suciedad se recomienda tallar la cenefa con alguna fibra que sea capaz de eliminar la mugre y de esta manera la estética y salud del vaso de la alberca se mantenga.' },
// ];

const opcionesTipoAlberca = [
    { label: 'OLÍMPICA', value: 'OLIMPICA' },
    { label: 'SEMIOLÍMPICA', value: 'SEMIOLÍMPICA' },
    { label: 'FOSA DE CLAVADOS', value: 'FOSA DE CLAVADOS' },
    { label: 'CHAPOTEADERO', value: 'CHAPOTEADERO' },
    { label: 'ALBERCA RECREATIVA', value: 'ALBERCA RECREATIVA' },
    { label: 'JACUZZI', value: 'JACUZZI' }
  ];
  
  const opcionesCaracteristicaAlberca = [
    { label: 'TECHADA', value: 'TECHADA' },
    { label: 'NO TECHADA', value: 'NO TECHADA' }
  ];

export const ReporteMensualForm = ({modalNuevoReporteMensual, setModalNuevoReporteMensual}) => {
    
    const [sedes, setSedes] = useState();
    const [albercas, setAlbercas] = useState();
    const [sedeSeleccionada, setSedeSeleccionada] = useState();

    const initialValues = {
        FECHA: "",
        FIRSTDATE: "",
        LASTDATE: "",
        SEDE: "",
        ALCALDIA: "",
        ALBERCA: "",
        TIPOALBERCA: "",
        CARACTERISTICA: "",
        REALIZO: "",
        REVISO: "",
        REPORT_LIST_IMAGES: [{
            ACTIVITY: "",
            IMAGES: [],
            TEXT_IMAGES: "",
            OBSERVACIONES: ""
        }]
    };
    

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

    const onSubmit = (values, { resetForm }) => {
        console.log(values);

        const initialValues2 = {
            FECHA: values.FECHA,
            FIRSTDATE: values.FIRSTDATE,
            LASTDATE: values.LASTDATE,
            SEDE: values.SEDE,
            ALCALDIA: values.ALCALDIA,
            ALBERCA: values.ALBERCA,
            TIPOALBERCA: values.TIPOALBERCA,
            CARACTERISTICA: values.CARACTERISTICA,
            REALIZO: values.REALIZO,
            REVISO: values.REVISO,
            REPORT_LIST_IMAGES: [
                {
                    ACTIVITY: values.REPORT_LIST_IMAGES[0].ACTIVITY
                },
                {
                    IMAGES: values.REPORT_LIST_IMAGES[0].IMAGES
                },
                {
                    TEXT_IMAGES: values.REPORT_LIST_IMAGES[0].TEXT_IMAGES
                },
                {
                    OBSERVACIONES: values.REPORT_LIST_IMAGES[0].OBSERVACIONES
                }
            ]
        };
        
        console.log(initialValues2);
    } 

  return (
        <>
        <Dialog header='Reporte Fotográfico Mensual' visible={modalNuevoReporteMensual} baseZIndex={-1} style={{ width: '80vw', height: '40vw' }} onHide={() => setModalNuevoReporteMensual(false)} className='pt-20'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange, isSubmitting  }) => (
                <Form>
                    <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                    <h1 className='text-2xl font-semibold'>Datos generales</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="FECHA"
                                        value={values.FECHA}
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Fecha  
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="FIRSTDATE"
                                        value={values.FIRSTDATE}
                                    />  
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Periodo (Fecha Inicial)
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="LASTDATE"
                                        value={values.LASTDATE}

                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Periodo (Fecha final)
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="SEDE"
                                        value={sedeSeleccionada}
                                        options={sedes}
                                        optionLabel="nombre" 
                                        onChange={(e) => setSedeSeleccionada(e.target.value)}
                                        filter
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Sede
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="ALCALDIA"
                                        value={values.ALCALDIA}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Alcaldia
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="ALBERCA"
                                        value={values.ALBERCA}
                                        // options={opcionesEstatusBombeo}
                                        // optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Alberca
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="tipoalberca"
                                        value={values.TIPOALBERCA}
                                        options={opcionesTipoAlberca}
                                        optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Tipo de Alberca
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="caracteristica"
                                        value={values.CARACTERISTICA}
                                        options={opcionesCaracteristicaAlberca}
                                        optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Caracteristica de la Alberca
                                    </label>
                                </span>
                            </div>
                        </div>
                        </div>
                        <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                        <h1 className='text-2xl font-semibold'>Actividades</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6'> 
                                <FieldArray name="REPORT_LIST_IMAGES">
                                  {({ insert, remove, push }) => (
                                    <div>
                                      {values.REPORT_LIST_IMAGES.length > 0 &&
                                        values.REPORT_LIST_IMAGES.map((report, index) => (
                                          <div key={index}>
                                            <button
                                                className='hover:shadow-slate-600 border h-10 px-4 bg-[#BE1622] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-[#d52935] text-left ml-auto flex items-center'
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                <ion-icon name="trash"></ion-icon>
                                            </button>
                                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
                                                <div className="p-inputgroup mb-5 mt-5">
                                                    <span className='p-float-label relative'>
                                                        <Field
                                                            className="w-full appearance-none focus:outline-none bg-transparent"
                                                            as={Dropdown}
                                                            name={`REPORT_LIST_IMAGES.${index}.ACTIVITY`}
                                                            options={opcionesActividades}
                                                            optionLabel="label"
                                                            // onChange={(e) => setSelectedActivity(e.value)}
                                                            // value={selectedActivity}
                                                        /> 
                                                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                        </span>
                                                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                            Actividad
                                                        </label>
                                                    </span>
                                                </div>
                                                <div className="p-inputgroup mb-5 mt-5 cursor-pointer flex gap-3 justify-center">
                                                        <button
                                                            type="submit"
                                                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                        >
                                                            Imagenes
                                                        </button>
                                                </div>
                                                <div className="p-inputgroup mb-5 mt-5 col-span-2">
                                                    <span className='p-float-label relative'>
                                                        <Field
                                                            className="w-full appearance-none focus:outline-none bg-transparent"
                                                            as={InputTextarea}
                                                            name={`REPORT_LIST_IMAGES.${index}.TEXT_IMAGES`}
                                                            // value={
                                                            //     selectedActivity === "Limpieza de trampas de pelo" // Reemplaza "Actividad1" con el valor de la actividad que quieras asociar con el texto predeterminado
                                                            //       ? "Texto predeterminado para Actividad1"
                                                            //       : selectedActivity === "Retiro de sólidos suspendidos" // Reemplaza "Actividad2" con otro valor de actividad
                                                            //       ? "Texto predeterminado para Actividad2"
                                                            //       : "" // Puedes agregar más condiciones según sea necesario
                                                            //   }
                                                        /> 
                                                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                        </span>
                                                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                            Texto de imagenes
                                                        </label>
                                                    </span>
                                                </div>
                                                <div className="p-inputgroup mb-5 col-span-4">
                                                    <span className='p-float-label relative'>
                                                        <Field
                                                            className="w-full appearance-none focus:outline-none bg-transparent"
                                                            as={InputTextarea}
                                                            name={`REPORT_LIST_IMAGES.${index}.OBSERVACIONES`}
                                                        /> 
                                                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                        </span>
                                                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                            Observaciones
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                          </div>
                                        ))}
                                      <button
                                        className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 text-left ml-auto flex items-center'
                                        type="button"
                                        onClick={() => push()}
                                      >
                                        <ion-icon name="add-circle"></ion-icon> Actividad
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>
                            </div>
                        </div>
                        <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                        <h1 className='text-2xl font-semibold'>Responsables</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
                                <div className="p-inputgroup mb-5 mt-5">
                                    <span className='p-float-label relative'>
                                        <Field
                                            className="w-full appearance-none focus:outline-none bg-transparent"
                                            as={InputText}
                                            name="REALIZO"
                                            value={values.REALIZO}    
                                        /> 
                                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                        </span>
                                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                            Realizo 
                                        </label>
                                    </span>
                                </div>
                                <div className="p-inputgroup mb-5 mt-5">
                                    <span className='p-float-label relative'>
                                        <Field
                                            className="w-full appearance-none focus:outline-none bg-transparent"
                                            as={InputText}
                                            name="REVISO"
                                            value={values.REVISO}
                                            
                                        /> 
                                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                        </span>
                                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                            Reviso 
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
                    <button
                        type="submit"
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    >
                        Guardar
                    </button>
                    </div>
                </Form>
            )}
        </Formik>
        </Dialog>
        </>
  )
}
