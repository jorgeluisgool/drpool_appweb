import { Formik, Form, Field, ErrorMessage } from "formik";
import * as XLSX from "xlsx"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExampleContex } from "../context/ExampleContext";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { useFetchProjects } from "../hooks/useFetchProjects";
import useAuth from "../hooks/useAuth";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Player } from "@lottiefiles/react-lottie-player";

const tipoProyecto = [
    { name: 'MIGRACIONES', code: 'migraciones' },
    { name: 'INVENTARIO', code: 'inventario' },
    { name: 'MANTENIMIENTO', code: 'mantenimiento' },
    { name: 'OTROS', code: 'otros' },
];


export const CrearProyectoForm = () => {

    const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);
    const { data: proyectos, loading } = useFetchProjects();
    const [showDialog, setShowDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const showDialogFunc = (message) => {
      setErrorMessage(message);
      setShowDialog(true);
    };
    
    const hideDialog = () => {
      setShowDialog(false);
    };



    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = function (event) {
          const content = event.target.result;
          const workbook = XLSX.read(content, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
      
          const grupos = data.reduce((grupos, campo) => {
            const grupo = grupos.find(g => g.agrupacion === campo.agrupacion);
            if (grupo) {
              grupo.campos.push(campo);
            } else {
              grupos.push({
                agrupacion: campo.agrupacion,
                campos: [campo]
              });
            }
            return grupos;
          }, []);
      
          const arreglo2 = grupos.map((grupo, grupoIndex) => ({
            id: `${grupoIndex + 1}`,
            agrupacion: grupo.agrupacion,
            campos: grupo.campos.map((campo, campoIndex) => ({
              id: `${campoIndex + 1}`,
              nombreCampo: campo.campo, // Cambio de "campo" a "nombreCampo"
              tipoCampo: campo.tipocampo, // Cambio de "tipocampo" a "tipoCampo"
              restriccion: campo.restriccion,
              longitud: campo.longitud
            }))
          }));
      
          const dataArchivoExcel = [
            {
              id: '0',
              agrupacion: 'DATOS DEL REGISTRO',
              campos: [
                {
                  id: '1',
                  nombreCampo: 'FOLIO',
                  tipoCampo: 'ALFANUMERICO',
                  restriccion: '[N/A]',
                  longitud: 10
                }
              ]
            },
            ...arreglo2,
            {
              id: `${arreglo2.length + 1}`,
              agrupacion: 'FIRMAS',
              campos: [
                {
                  id: '1',
                  nombreCampo: 'FIRMA',
                  tipoCampo: 'FIRMA',
                  restriccion: '[N/A]',
                  longitud: 10
                }
              ]
            }
          ];
      
          setDataArchivoExcel(dataArchivoExcel);
        };
      
        reader.readAsBinaryString(file);
      };

    // Se obtiene el context para mandar el formulario resgistrar proyecto
    const { dataCrearProyecto, setDataCrearProyecto } = useContext(ExampleContex);
    // console.log(dataCrearProyecto)

    // se usa el hook useNavigate de react-router-dom para navegar al vista de campos proyecto
    const navigate = useNavigate();

    // Funcion que hace navegar a campos proyecto usando el hook useNavigate de react-router-dom
    const handleSubmit = () => {
        navigate('/camposproyecto');
    }

    return (
        <>
        <Formik 
            initialValues={{
                proyecto: '',
                tipo: '',
                agregarArchivo: '',
            }}

            validate={(valores) => {
                let errores = {};

                // Validacion input nombre proyecto
                if(!valores.proyecto) {
                    errores.proyecto = 'Ingrese el nombre del proyecto'
                } else if(!/^[A-Za-z0-9\s]+$/.test(valores.proyecto)) {
                    errores.proyecto = 'El nombre del proyecto solo acepta: letras y numeros'
                }

                // Validacion input Agregar archivo
                if (!valores.agregarArchivo) {
                    errores.agregarArchivo = "Debes adjuntar un archivo"
                }

                return errores;
            }}

            onSubmit={(valores, {resetForm}) => {
              
              const proyectosFilter = proyectos.find(proyect => proyect.proyecto === valores.proyecto);

              if (proyectosFilter === undefined){
                // aqui se mandan los valores del formulario al context para usarlos en la vista camposProyecto
                setDataCrearProyecto( valores);

                // hace que los inputs del formulario se reinicien al estado inicial al hacer click 
                resetForm();

                // llamada a la funcion del naviate a campos proyecto
                handleSubmit();
              }else{
                showDialogFunc("El nombre del proyecto ya existe")
              }    
            }}
        >
            {({values, errors, setFieldValue}) => (
                <Form>
                    <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
                    <label className="mx-0 my-1 text-xl font-bold text-[#245A95]">
                        CREAR PROYECTO
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button download="" className="shadow-md bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] scroll-ml-5 w-14 h-14 active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] text-4xl font-bold">
                                <ion-icon name="archive-sharp"></ion-icon>
                            </button>
                        </div>
                        <div className='mt-8 flex flex-col gap-y-1 w-full'>
                            <div className="p-inputgroup">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={InputText}
                                        name="proyecto"
                                        value={values.proyecto}
                                        onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Proyecto
                                    </label>
                                </span>
                            </div>
                            <ErrorMessage name="proyecto" component={() => (
                                <span className="text-red-600"><ion-icon name="alert-circle-sharp"></ion-icon> {errors.proyecto}</span>
                            )}/>   
                        </div>
                        
                        <div className="mt-8 flex flex-col gap-y-1 w-full">
                            <div className="p-inputgroup">
                                <span className='p-float-label relative'>
                                    <Field
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        as={Dropdown}
                                        name="tipo"
                                        options={tipoProyecto}
                                        optionLabel="name"
                                    />
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                        <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="tipo" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                        Tipo de proyecto
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-1">
                            <input 
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-[#245A95] file:text-white
                                hover:file:bg-sky-700
                                form-input border border-gray-300 bg-whit py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" 
                                id="archivo"
                                type="file" 
                                name="agregarArchivo"
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(event) => {
                                    setFieldValue("agregarArchivo", event.currentTarget.files[0]); handleFileUpload(event);
                                }}
                            />
                            <ErrorMessage name="agregarArchivo" component={() => (
                                <span className="text-red-600"><ion-icon name="alert-circle-sharp"></ion-icon> {errors.agregarArchivo}</span>
                            )}/>
                        </div>
                    </div>
                        <div className="flex">
                            <button
                              type="submit"
                              className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                              <ion-icon name="arrow-forward"></ion-icon>
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik> 
        <Dialog
          visible={showDialog}
          onHide={hideDialog}
          header={
          <>
            <span className="pr-1">{errorMessage}</span>
              <ion-icon name="help-circle"></ion-icon>
          </>   
        }
          footer={<button onClick={hideDialog} className="px-6 ml-auto object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-sm font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4" >OK</button>}
        >
          <p className="text-3xl font-black">Es necesario cambiar el nombre</p>
          <Player src='https://assets10.lottiefiles.com/packages/lf20_Tkwjw8.json'
            className="player"
            loop
            autoplay
            style={{ height: '150px', width: '150px' }}
          />
        </Dialog>      
        </>
    )
}