import { Field, FieldArray, Form, Formik} from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useState } from 'react'
import { api } from '../helpers/variablesGlobales'
import { format, parse } from 'date-fns'
import { addLocale } from 'primereact/api'
import ModalSeleccionImagenesReporMensual from './ModalSeleccionImagenesReporMensual'

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

const opcionesActividades = [
    { label: 'Limpieza de trampas de pelo', value: 'LIMPIEZA DE TRAMPAS' },
    { label: 'Retiro de sólidos suspendidos', value: 'RETIRO DE SOLIDOS' },
    { label: 'Retrolavado de filtro', value: 'RETROLAVADO' },
    { label: 'Cepillado de paredes y piso', value: 'CEPILLADO DE PAREDES' },
    { label: 'Aspirado', value: 'ASPIRADO' },
    { label: 'Limpieza de cenefa', value: 'LIMPIEZA DE CENEFA' },
    { label: 'Limpieza de la rejilla perimetral', value: 'Limpieza de la rejilla perimetral' },
    { label: 'Limpieza de área perimetral', value: 'Limpieza de área perimetral' },
    { label: 'Otro', value: 'otro' },
];

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

export const ReporteMensualForm = ({modalNuevoReporteMensual, setModalNuevoReporteMensual, sedes, sedeSeleccionada, setSedeSeleccionada, albercas, setAlbercas, clienteSeleccionado, albercaSeleccionada, setAlbercaSeleccionada}) => {

    const [modalSeleccionImagenes, setModalSeleccionImagenes] = useState(false);
    const [imagenesActivdades, setImagenesActivdades] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [arregloSelectedImages, setArregloSelectedImages] = useState([])

    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);
    const [selectedImagesIndex, setSelectedImagesIndex] = useState(null);

    // console.log('actividad', selectedActivities[selectedActivityIndex])

    const initialValues = {
        FECHA: "",
        FIRSTDATE: "",
        LASTDATE: "",
        SEDE: sedeSeleccionada,
        ALCALDIA: sedeSeleccionada?.direccion.alcaldia,
        ALBERCA: albercaSeleccionada,
        TIPOALBERCA: "",
        CARACTERISTICA: "",
        REALIZO: "",
        REVISO: "",
        REPORT_LIST_IMAGES: []
    };
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const parametros = {
              ALBERCA: albercaSeleccionada.idalberca,
              ACTIVIDAD: selectedActivities[selectedImagesIndex]
            };
      
            const response = await fetch(`${api}/obtener/imagenes/actividades/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(parametros)
            });
      
            if (response.ok) {
              const jsonData = await response.json();
              console.log(jsonData);
              setImagenesActivdades(jsonData);
            } else {
              console.error('Error en la solicitud');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        fetchData();
      }, [selectedActivities, albercaSeleccionada, selectedImagesIndex, selectedImages]);
      

    // Función para convertir la fecha en formato válido de la fecha
    const parseDate = (dateString) => {
        if (typeof dateString === "string") {
            const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
            return parsedDate;
        } else {
            return dateString
        }  
      };

    const onSubmit = (values, { resetForm }) => {

        setSelectedImages([]); 
        
        if(typeof values.FECHA !== "string"){
            const formattedDate = format(values.FECHA, "dd/MM/yy");
            values.FECHA = formattedDate;
        }

        if(typeof values.FIRSTDATE !== "string"){
            const formattedDate = format(values.FIRSTDATE, "dd/MM/yy");
            values.FIRSTDATE = formattedDate;
        }

        if(typeof values.LASTDATE !== "string"){
            const formattedDate = format(values.LASTDATE, "dd/MM/yy");
            values.LASTDATE = formattedDate;
        }

        // Actualiza el valor de ACTIVITY para todas las actividades
        values.REPORT_LIST_IMAGES.forEach((report, index) => {
          report.ACTIVITY = selectedActivities[index];
        });
        // // AQUI SE LE ASIGNA LA ACTIVIDAD AL INITIAL VALUES DEL STATE 
        // values.REPORT_LIST_IMAGES[selectedActivityIndex].ACTIVITY = selectedActivities[selectedActivityIndex];


        // Actualiza el valor de IMAGES para cada actividad
        // values.REPORT_LIST_IMAGES.forEach((report, index) => {
        //   report.IMAGES = selectedImages[index] || []; // Usar el arreglo de imágenes seleccionadas correspondiente
        // });
        // AQUI SE ESTAN ASIGNADO EL ARREGLO DE IMAGENES SELECIONADAS
        values.REPORT_LIST_IMAGES[0].IMAGES = selectedImages;
  
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
            REPORT_LIST_IMAGES: values.REPORT_LIST_IMAGES.map((item, index) => ( 
                [
                    {
                        ACTIVITY: values.REPORT_LIST_IMAGES[index].ACTIVITY
                    },
                    {
                        IMAGES: values.REPORT_LIST_IMAGES[index].IMAGES
                    },
                    {
                        TEXT_IMAGES: values.REPORT_LIST_IMAGES[index].TEXT_IMAGES
                    },
                    {
                        OBSERVACIONES: values.REPORT_LIST_IMAGES[index].OBSERVACIONES
                    }
                ]
            ))
        };
        
        console.log(initialValues2);
    }  

  return (
        <>
        <ModalSeleccionImagenesReporMensual
            modalSeleccionImagenes={modalSeleccionImagenes}
            setModalSeleccionImagenes={setModalSeleccionImagenes}
            imagenesActivdades={imagenesActivdades}
            selectedActivity={selectedActivity}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            selectedActivities={selectedActivities}
            selectedActivityIndex={selectedActivityIndex}
            setSelectedImagesIndex
        />

        <Dialog header='Reporte Fotográfico Mensual' visible={modalNuevoReporteMensual} baseZIndex={-1} style={{ width: '80vw', height: '40vw' }} onHide={() => setModalNuevoReporteMensual(false)} className='pt-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6'>
            <div className="p-inputgroup mb-5 mt-5">
                <span className='p-float-label relative'>
                    <Dropdown
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        name="sede"
                        value={sedeSeleccionada}
                        options={sedes?.filter((sede) => (sede.cliente.cliente === clienteSeleccionado.cliente))} 
                        optionLabel="nombre"
                        // itemTemplate={renderClienteOption}
                        onChange={(e) => {setSedeSeleccionada(e.target.value)}}
                        filter
                        required
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
                    <Dropdown
                        className="w-full appearance-none focus:outline-none bg-transparent"
                        name="alberca"
                        value={albercaSeleccionada}
                        options={albercas?.filter((alberca) => (alberca.sede.nombre === sedeSeleccionada?.nombre && alberca.estatus === "ACTIVO"))}
                        optionLabel="nombrealberca" 
                        getOptionValue={(option) => option.nombrealberca}
                        required
                        onChange={(e) => setAlbercaSeleccionada(e.target.value)}
                    /> 
                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                    </span>
                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                        Alberca
                    </label>
                </span>
            </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange, isSubmitting, setFieldValue  }) => (
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
                                        value={parseDate(values.FECHA)}
                                        dateFormat="dd/MM/yy"
                                        locale='es'
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
                                        value={parseDate(values.FIRSTDATE)}
                                        dateFormat="dd/MM/yy"
                                        locale='es'
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
                                        value={parseDate(values.LASTDATE)}
                                        dateFormat="dd/MM/yy"
                                        locale='es'

                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Periodo (Fecha final)
                                    </label>
                                </span>
                            </div>
                            {/* <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="clientes"
                                        value={sedeSeleccionada}
                                        optionLabel="nombre"
                                        // itemTemplate={renderClienteOption}
                                        onChange={(e) => {setSedeSeleccionada(e.target.value)}}
                                        filter
                                        options={sedes} 
                                        
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Sede
                                    </label>
                                </span>
                            </div> */}
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={InputText}
                                        name="ALCALDIA"
                                        value={values.ALCALDIA}
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Alcaldia
                                    </label>
                                </span>
                            </div>
                            {/* <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="ALBERCA"
                                        options={albercas}
                                        optionLabel="nombrealberca" 
                                        getOptionValue={(option) => option.nombrealberca}
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Alberca
                                    </label>
                                </span>
                            </div> */}
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="TIPOALBERCA"
                                        // value={values.TIPOALBERCA}
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
                                        name="CARACTERISTICA"
                                        // value={values.CARACTERISTICA}
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
                                            <>
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
                                                            onChange={(e) => {
                                                                setSelectedActivityIndex(index);
                                                                setSelectedActivities((prevActivities) => {
                                                                  const newActivities = [...prevActivities];
                                                                  newActivities[index] = e.value;
                                                                  return newActivities;
                                                                });
                                                              }}
                                                            // onChange={(e) => setSelectedActivity(e.value)}
                                                            value={selectedActivities[index]}
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
                                                {
                                                    setSelectedActivities != [] &&
                                                    <div className="p-inputgroup mb-5 mt-5 cursor-pointer flex gap-3 justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedImagesIndex(index);
                                                                setModalSeleccionImagenes(true)
                                                            }}
                                                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                        >
                                                            <ion-icon name="images-outline"></ion-icon> Imagenes
                                                        </button>
                                                    </div>
                                                }
                                                
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
                                          <hr className="divider" />
                                            </>  
                                        ))}
                                      <button
                                        className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 text-left ml-auto flex items-center'
                                        type="button"
                                        onClick={() => push({
                                            ACTIVITY: "",
                                            IMAGES: [],
                                            TEXT_IMAGES: "",
                                            OBSERVACIONES: "",
                                          })}
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
                                            Realizo (Cordinador) 
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
                                            Reviso (Administrador de la sede)
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







