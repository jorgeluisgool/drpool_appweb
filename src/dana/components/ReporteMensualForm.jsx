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

import textoActividades from '../data/textoActividades'
import { ModalTextoImagenes } from './reporteMensual/ModalTextoImagenes'

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
    { label: 'Limpieza de trampas de pelo', value: 'LIMPIEZA_DE_TRAMPAS_DE_PELO' },
    { label: 'Retiro de sólidos suspendidos', value: 'RETIRO_DE_SÓLIDOS_SUSPENDIDOS' },
    { label: 'Retrolavado de filtro', value: 'RETROLAVADO_DE_FILTRO' },
    { label: 'Cepillado de paredes y piso', value: 'CEPILLADO_DE_PAREDES_Y_PISO' },
    { label: 'Aspirado', value: 'ASPIRADO' },
    { label: 'Limpieza de cenefa', value: 'LIMPIEZA_DE_CENEFA' },
    { label: 'Limpieza de la rejilla perimetral', value: 'LIMPIEZA_DE_LA_REJILLA_PERIMETRAL' },
    { label: 'Limpieza de área perimetral', value: 'LIMPIEZA_DE_AREA_PERIMETRAL' },
    { label: 'Otra actividad', value: 'OTRA_ACTIVIDAD' },
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

export const ReporteMensualForm = ({modalNuevoReporteMensual, setModalNuevoReporteMensual, sedes, sedeSeleccionada, setSedeSeleccionada, albercas, setAlbercas, clienteSeleccionado, albercaSeleccionada, setAlbercaSeleccionada, setVentanaCarga}) => {

    const [modalSeleccionImagenes, setModalSeleccionImagenes] = useState(false);
    const [imagenesActivdades, setImagenesActivdades] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesForActivities, setImagesForActivities] = useState([]);

    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedActivitiesInputText, setSelectedActivitiesInputText] = useState([]);
    const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);
    const [selectedImagesIndex, setSelectedImagesIndex] = useState(null);

    const [indexActividadDelSelect, setIndexActividadDelSelect] = useState(null)
    const [textoActividadesState, setTextoActividadesState] = useState(textoActividades)
    const [arregloDeTextosPorActividades, setArregloDeTextosPorActividades] = useState([]);
    const [modalTextoImagenesSate, setModalTextoImagenesSate] = useState(false);

    const actividadSeleccionada = selectedActivities[0];
    // console.log(selectedActivities[selectedActivityIndex])
    // console.log(selectedActivitiesInputText);

    const [activityTextImages, setActivityTextImages] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    // Fusiona los dos arreglos en uno solo
    // console.log(selectedActivities);
    // console.log(selectedActivitiesInputText);
    const combinedActivities = [...selectedActivities, ...selectedActivitiesInputText];
    const combinedActivitiesFilter = combinedActivities.filter((actividad) => actividad !== undefined  && actividad !== 'OTRA_ACTIVIDAD')
    // ESTE FRAGMENTO DE CODIGO GENERA EL FOLIO DEACUERDO A LA FECHA Y LA ABREVIATURA RFM
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Obtiene el día en formato "DD"
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes en formato "MM"
    const year = currentDate.getFullYear().toString().slice(-2); // Obtiene los últimos 2 dígitos del año en formato "YY"
    const FOLIO = `RFM-${day}-${month}-${year}`;

    // console.log(albercaSeleccionada);
    const initialValues = { 
        FOLIO: FOLIO,
        FECHA: "",
        FIRSTDATE: "",
        LASTDATE: "",
        SEDE: sedeSeleccionada,
        ALCALDIA: sedeSeleccionada?.direccion.alcaldia,
        ALBERCA: albercaSeleccionada,
        TIPOALBERCA: albercaSeleccionada?.tipoalberca,
        CARACTERISTICA: albercaSeleccionada?.caracteristica,
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
            //   console.log(jsonData);
              setImagenesActivdades(jsonData);
            } else {
              console.error('Error en la solicitud');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        fetchData();
      }, [selectedActivities, albercaSeleccionada, selectedImagesIndex, selectedImages, modalNuevoReporteMensual]);

    // Función para convertir la fecha en formato válido de la fecha
    const parseDate = (dateString) => {
        if (typeof dateString === "string") {
            const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
            return parsedDate;
        } else {
            return dateString
        }  
      };

    // FUNCION PARA ENVIAR EL FORMULARIO  
    const onSubmit = (values, { resetForm }) => {

        // console.log(selectedActivities[selectedActivityIndex])
        setVentanaCarga(true);
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

        {
            selectedActivities[selectedActivityIndex] === 'OTRA_ACTIVIDAD' ? 
            // Actualiza el valor de ACTIVITY para todas las actividades
            values.REPORT_LIST_IMAGES.forEach((report, index) => {
                report.ACTIVITY = combinedActivitiesFilter[index]
            })
            :
            // Actualiza el valor de ACTIVITY para todas las actividades
            values.REPORT_LIST_IMAGES.forEach((report, index) => {
                report.ACTIVITY = combinedActivitiesFilter[index]
            })
        }
        
        // Actualiza el valor del arreglo de IMAGES para todas las actividades
        values.REPORT_LIST_IMAGES.forEach((report, index) => {
            report.IMAGES = imagesForActivities[index];
        });


        // Actualiza el valor del arreglo de IMAGES para todas las actividades
         values.REPORT_LIST_IMAGES.forEach((report, index) => {
             report.TEXT_IMAGES = arregloDeTextosPorActividades[index];
         });

        const initialValues2 = {
            idreportemensual: 0,
            FOLIO: values.FOLIO,
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
                        ACTIVITY: values.REPORT_LIST_IMAGES[index].ACTIVITY.replace(/_/g, ' ')
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

        fetch(`${api}/generar/reporte/mensual`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(initialValues2),
          })
            .then((response) => response.text())
            .then((responseData) => {
                console.log(responseData);
                console.log("Se subio reporte mensual");
                resetForm();
                setSelectedActivities([]);
                setImagesForActivities([]);
                setArregloDeTextosPorActividades([]);
                setModalNuevoReporteMensual(false);
                setVentanaCarga(false);            
            })
            .catch((error) => {
              console.log(error);
            });
    }  

    // console.log(selectedActivities[selectedActivityIndex])
    useEffect(() => {
        // Cuando cambia setSelectedActivities, mostramos la notificación durante 5 segundos.
        setShowNotification(true);
    
        const notificationTimeout = setTimeout(() => {
          // Ocultamos la notificación después de 5 segundos.
          setShowNotification(false);
        }, 5000);
    
        return () => {
          // Limpiamos el temporizador si el componente se desmonta o setSelectedActivities cambia nuevamente.
          clearTimeout(notificationTimeout);
        };
      }, [selectedActivities]);
    
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
            selectedImagesIndex={selectedImagesIndex}
            imagesForActivities={imagesForActivities}
            setImagesForActivities={setImagesForActivities}
        />

        <Dialog header='Reporte Fotográfico Mensual' visible={modalNuevoReporteMensual} baseZIndex={-1} style={{ width: '80vw', height: '40vw' }} onHide={() => {setSelectedActivities([]); setImagesForActivities([]); setArregloDeTextosPorActividades([]); setModalNuevoReporteMensual(false)}} className='pt-20'>
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
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'> 
                        <div className="p-inputgroup mb-5 mt-5">
                            <span className='p-float-label relative'>
                                <Field
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                    as={InputText}
                                    name="FOLIO"
                                    required
                                    // value={values.FOLIO}   
                                /> 
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    * FOLIO:
                                </label>
                            </span>
                        </div>
                    </div>
                    <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                    <h1 className='text-2xl font-semibold'>Datos generales</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6'>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="FECHA"
                                        value={(values.FECHA)}
                                        dateFormat="dd/MM/yy"
                                        locale='es'
                                        required
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        * Fecha  
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="FIRSTDATE"
                                        value={(values.FIRSTDATE)}
                                        dateFormat="dd/MM/yy"
                                        locale='es'
                                        required
                                    />  
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        * Periodo (Fecha Inicial)
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Calendar}
                                        name="LASTDATE"
                                        value={(values.LASTDATE)}
                                        dateFormat="dd/MM/yy"
                                        locale='es'
                                        required
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        * Periodo (Fecha final)
                                    </label>
                                </span>
                            </div>
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
                                      Alcaldía
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="TIPOALBERCA"
                                        options={opcionesTipoAlberca}
                                        optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Tipo de alberca
                                    </label>
                                </span>
                            </div>
                            <div className="p-inputgroup mb-5 mt-5">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="CARACTERISTICA"
                                        options={opcionesCaracteristicaAlberca}
                                        optionLabel="label" 
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Característica de la alberca
                                    </label>
                                </span>
                            </div>
                        </div>
                        </div>
                        <div className='bg-[#E2E2E2] p-2 rounded-xl mt-4'>
                        <h1 className='text-2xl font-semibold'>Actividades</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6'> 
                                <FieldArray name="REPORT_LIST_IMAGES">
                                  {({ insert, remove, push }) => (
                                    <div>
                                      {values.REPORT_LIST_IMAGES.length > 0 &&
                                        values.REPORT_LIST_IMAGES.map((report, index) => (
                                            <>
                                            <div key={index}>
                                            <p className='text-center font-bold text-xl'>
                                              {selectedActivities[index] ? selectedActivities[index].replace(/_/g, ' ') : ''}
                                            </p>
                                            <button
                                                className='hover:shadow-slate-600 border h-10 px-4 bg-[#BE1622] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-[#d52935] text-left ml-auto flex items-center'
                                                type="button"
                                                onClick={() =>{ 
                                                    
                                                    remove(index);
                                                    setSelectedActivities(prevSelectedActivities => {
                                                         const updatedSelectedActivities = [...prevSelectedActivities];
                                                         updatedSelectedActivities.splice(index, 1);
                                                         return updatedSelectedActivities;
                                                     });
                                                     setSelectedImages(prevSelectedImages => {
                                                         const updatedSelectedImages = [...prevSelectedImages];
                                                         updatedSelectedImages.splice(index, 1);
                                                         return updatedSelectedImages;
                                                     });
                                                     setArregloDeTextosPorActividades(prevArregloDeTextos => {
                                                         const updatedArregloDeTextos = [...prevArregloDeTextos];
                                                         updatedArregloDeTextos.splice(index, 1);
                                                         return updatedArregloDeTextos;
                                                     });
                                                     setImagesForActivities(prevArregloDeImagenes => {
                                                       const updatedArregloDeTextos = [...prevArregloDeImagenes];
                                                       updatedArregloDeTextos.splice(index, 1);
                                                       return updatedArregloDeTextos;
                                                   });
                                                
                                                }}
                                            >
                                                <ion-icon name="trash"></ion-icon>
                                            </button>
                                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">     
                                                <div className="p-inputgroup mb-5">
                                                    <span className='p-float-label relative'>
                                                            <Field
                                                                className="w-full appearance-none focus:outline-none bg-transparent"
                                                                as={Dropdown}
                                                                name={`REPORT_LIST_IMAGES.${index}.ACTIVITY`}
                                                                options={opcionesActividades}
                                                                optionLabel="label"
                                                                onChange={(e) => {
                                                                    
                                                                    // const selectedIndex = opcionesActividades.findIndex(
                                                                    //     (opcion) => opcion.value === e.value.value
                                                                    //   );

                                                                    // setIndexActividadDelSelect(selectedIndex);    
                                                                    setSelectedActivityIndex(index);
                                                                    // setSelectedActivities(report);
                                                                     setSelectedActivities((prevActivities) => {
                                                                     const newActivities = [...prevActivities];
                                                                     newActivities[index] = e.value;
                                                                     return newActivities;
                                                                    });
                                                                }}
                                                                value={selectedActivities[index]}
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
                                                    selectedActivities[selectedActivityIndex] === 'OTRA_ACTIVIDAD' &&
                                                    <div className="p-inputgroup mb-5">
                                                        <span className='p-float-label relative'>
                                                                <Field
                                                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                                                    as={InputText}
                                                                    name={`REPORT_LIST_IMAGES.${index}.ACTIVITY`}
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value)
                                                                        // const selectedIndex = opcionesActividades.findIndex(
                                                                        //     (opcion) => opcion.value === e.value.value
                                                                        //   );

                                                                        // setIndexActividadDelSelect(selectedIndex);    
                                                                        // setSelectedActivityIndex(index);
                                                                        // setSelectedActivities(report);
                                                                         setSelectedActivitiesInputText((prevActivities) => {
                                                                         const newActivities = [...prevActivities];
                                                                         newActivities[index] = e.target.value;
                                                                         return newActivities;
                                                                        });
                                                                    }}
                                                                    value={selectedActivitiesInputText[index]}
                                                                />
                                                            <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                              <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                            </span>
                                                            <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                                Actividad
                                                            </label>
                                                        </span>
                                                    </div>
                                                }
                                                
                                                {/* {
                                                    selectedActivities[0] != undefined && */}
                                                    <div className="p-inputgroup mb-5 cursor-pointer flex gap-3 justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedActivityIndex(index);
                                                                setSelectedImagesIndex(index);
                                                                setSelectedImages(imagesForActivities[index]);
                                                                setModalSeleccionImagenes(true);
                                                            }}
                                                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                                                        >
                                                            <ion-icon name="images-outline"></ion-icon> Imágenes
                                                        </button>
                                                    </div>
                                                {/* }       */}
                                                <div className="p-inputgroup mb-5 col-span-4">
                                                    <span className='p-float-label relative'>
                                                        <Field
                                                            className="w-full appearance-none focus:outline-none bg-transparent"
                                                            as={InputTextarea}
                                                            name={`REPORT_LIST_IMAGES.${index}.TEXT_IMAGES`}
                                                            onChange={(e) => {
                                                                    
                                                                // const selectedIndex = opcionesActividades.findIndex(
                                                                //     (opcion) => opcion.value === e.value.value
                                                                //   );

                                                                // setIndexActividadDelSelect(selectedIndex);    
                                                                
                                                                // setSelectedActivities(report);
                                                                setArregloDeTextosPorActividades((prevTextActivities) => {
                                                                 const newTextActivities = [...prevTextActivities];
                                                                 newTextActivities[index] = e.target.value;
                                                                 return newTextActivities;
                                                                });
                                                            }}
                                                            // onChange={(e) => {
                                                            //     const newValue = e.target.value;
                                                            //     // Actualiza el valor del campo en el formulario
                                                            //     // setFieldValue(`REPORT_LIST_IMAGES[${index}].TEXT_IMAGES`, newValue);
                                                            //     // Realiza la lógica para actualizar el valor de textoActividades si es necesario
                                                            //     const updatedTextoActividades = textoActividades.map((obj) => {
                                                            //       if (obj[actividadSeleccionada]) {
                                                            //         obj[actividadSeleccionada] = newValue;
                                                            //       }
                                                            //       return obj;
                                                            //     });
                                                            //     // Luego, actualiza textoActividades si es necesario
                                                            //     setTextoActividadesState(updatedTextoActividades);
                                                            // }}
                                                            value={arregloDeTextosPorActividades[index]} 
                                                            // value={
                                                            //     textoActividadesState.find((obj) => obj[actividadSeleccionada])
                                                            //       ? textoActividadesState.find((obj) => obj[actividadSeleccionada])[actividadSeleccionada]
                                                            //       : ''
                                                            // }
                                                        /> 
                                                        <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                                          <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                                        </span>
                                                        <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                                            Texto de imágenes
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
                                          onClick={() => {
                                            // Define la nueva actividad con sus propiedades
                                            const newActivity = {
                                              ACTIVITY: "",
                                              IMAGES: [],
                                              TEXT_IMAGES: "",
                                              OBSERVACIONES: "",
                                            };
                                        
                                            // Asegúrate de que imagesForActivities sea un arreglo
                                            if (!Array.isArray(imagesForActivities)) {
                                              imagesForActivities = [];
                                            }
                                        
                                            // Añade un nuevo subarreglo vacío para esta actividad
                                            imagesForActivities.push([]);
                                        
                                            // Agrega la nueva actividad al arreglo de actividades
                                            push(newActivity);
                                        
                                            // Actualiza selectedActivityIndex al índice de la nueva actividad
                                            setSelectedActivityIndex(imagesForActivities.length - 1);

                                            setSelectedImages([]);
                                          }}
                                        >
                                      <ion-icon name="add-circle"></ion-icon> Actividad
                                    </button>
                                    
                                    </div>
                                  )}
                                </FieldArray>
                            </div>
                        </div>
                        <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2 mt-4'>
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
                                            Realizó (Cordinador) 
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
                                            Revisó (Administrador de la sede)
                                        </label>
                                    </span>
                                </div>
                            </div>  
                        </div>
                        <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
                            <button
                                type="submit"
                                className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 z-10"
                            >
                                Guardar
                            </button>
                        </div>    
                        <div className="cursor-pointer absolute inset-x-0 bottom-4 left-4 flex gap-3 justify-start">
                          <button
                            type="button"
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 relative z-0"
                            onClick={() => setModalTextoImagenesSate(true)}
                          >
                            <ion-icon name="document-text-outline"></ion-icon> Textos de imágenes
                            <span className={`bg-green-500 w-4 h-4 rounded-full absolute top-0 right-0 -mt-1 -mr-1 border ${showNotification ? 'animate-pulse' : 'hidden'}`}></span>
                          </button>  
                        </div>
                </Form>
            )}
        </Formik>
        <ModalTextoImagenes 
            modalTextoImagenesSate={modalTextoImagenesSate} 
            setModalTextoImagenesSate={setModalTextoImagenesSate}
            selectedActivities={selectedActivities}
            selectedActivityIndex={selectedActivityIndex}
            textoActividadesState={textoActividadesState}
        />
        </Dialog>
        </>
  )
}







