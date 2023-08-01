import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import {InputPassword} from "../components/TiposDeCampos";
import './stylosPrimeReact.css'
import { api } from '../helpers/variablesGlobales';
import { Player } from '@lottiefiles/react-lottie-player';

export const TablaCRUD = ({ listaDatos = [], headers = [], tipoDatos = '', editar = false, eliminar = false, seleccionMultiple = false}) => {

    const [globalFilter, setGlobalFilter] = useState(null);
    const [datoSeleccionado, setDatoSeleccionado] = useState()
    const [lista, setLista] = useState(listaDatos)
    const [deleteProjectDialog, setDeleteProyectDialog] = useState(false);
    const [proyecto, setProyecto] = useState();
    const [passwordConfirnacion, setPasswordConfirnacion] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialogEliminado, setShowDialogEliminado] = useState(false);

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleDialogCloseEliminado = () => {
        setShowDialogEliminado(false);
    };

    const confirmDeleteProduct = (proyecto) => {
        console.log(proyecto);
        setProyecto(proyecto);
        setDeleteProyectDialog(true);
    };
    
    const hideDeleteProjectDialog = () => {
        setPasswordConfirnacion('');
        setDeleteProyectDialog(false);
    }
    
    
    const handleAceptarEliminar = ()=>{
        
        if (passwordConfirnacion === '') {
            console.log('Contraseña vacia');
            setErrorPassword(true);
        }else{

           const newLista = lista.filter((item) => item.idproyecto !== proyecto.idproyecto);

            fetch(`${api}/eliminar/proyecto/${passwordConfirnacion}`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(proyecto),
            }).then(response => {
            if (response.ok) {
                response.json().then(jsonData =>{
                    console.log(jsonData)
                    if (jsonData.Respuesta === 'La contraseña no coinside')
                        setShowDialog(true);
                    if (jsonData.Respuesta === 'Proyecto eliminado') {
                        setShowDialogEliminado(true);
                        setLista(newLista);
                    }
                });
            } else {
              console.log('Error al eliminar el elemento');
            }
            })
            .catch(error => console.log(error));

            hideDeleteProjectDialog();    
        }
    }
    
    const onSelection = (event) => {
        console.log(event.value);
        setDatoSeleccionado(event.value);
    }
    
    const onChangePass = (event)=>{
        setPasswordConfirnacion(event.target.value);
        if(passwordConfirnacion != ''){
            setErrorPassword(false);
        }
    }
    
    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1 text-xl font-bold text-[#245A95]">LISTA DE {tipoDatos}</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <>
            {editar &&
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={()=>{}} />}
            {eliminar &&     
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={()=>{confirmDeleteProduct(rowData)}} />}
            </>
        );
    }
    const deleteProjectDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProjectDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={handleAceptarEliminar} />
        </>
    );

    return (
        <Card className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden">
            <div className="datatable-crud-demo">
                {/* <Toast ref={toast} /> */}

                {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                <DataTable value={lista} selection={datoSeleccionado} onSelectionChange={onSelection}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} y {last} de {totalRecords} registros"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    {seleccionMultiple &&  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>}
                    {headers.map((head, index) => (
                        <Column key={index} field={head} header={head} sortable style={{ minWidth: '5rem' }}></Column>
                    ))}
                    {(editar || eliminar) && <Column header='Opciones' body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>}
                </DataTable>
            </div>
            {/* MODAL PARA AGREGAR CONTRASEÑA */}
            <Dialog visible={deleteProjectDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectDialogFooter} onHide={hideDeleteProjectDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'red' }} />
                    {proyecto && <span>¿Estas seguro de eliminar el proyecto <b>{proyecto.proyecto}</b>?, toda la informacion que contenga sera eliminada permanentemente (Registros, Evidencias, Fotografias, Documentos generados (PDF))</span>}
                <br/>
                <br/>
                <i>Ingresa la contraseña para poder eliminar el proyecto</i>
                <br/>
                <br/>
                <InputPassword valor={passwordConfirnacion} onChangevalor={onChangePass} onError={errorPassword}/>
                </div>
            </Dialog>
            {/* MODAL QUE MUESTRA QUE LA CONTRASEÑA NO COINCIDE */}
            <Dialog
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                footer={<button onClick={handleDialogClose} className="ml-auto object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-sm font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4" >Cerrar</button>}
              >
                <p className="text-3xl font-black pb-10">Contraseña invalida</p>
                <Player src='https://assets9.lottiefiles.com/packages/lf20_b0lj6sfx.json'
                  className="player"
                  loop
                  autoplay
                  style={{ height: '250px', width: '250px' }}
                />
            </Dialog>
            <Dialog
                visible={showDialogEliminado}
                onHide={() => setShowDialogEliminado(false)}
                footer={<button onClick={handleDialogCloseEliminado} className="ml-auto object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-sm font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4" >Cerrar</button>}
              >
                <p className="text-3xl font-black pb-10">Proyecto eliminado</p>
                <Player src='https://assets1.lottiefiles.com/private_files/lf30_yvnodua3.json'
                  className="player"
                  loop
                  autoplay
                  style={{ height: '250px', width: '250px' }}
                />
            </Dialog>

        </Card>
    )
}