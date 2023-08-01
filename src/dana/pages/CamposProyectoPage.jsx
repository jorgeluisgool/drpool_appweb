import AcordionCampos from '../components/AcordionCampos'
import { useContext, useEffect, useState } from 'react';
import { ExampleContex } from '../context/ExampleContext';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BotonFlotanteGuardar } from '../components/BotonFlotanteGuardar';
import { BotonFlotanteRegresar } from '../components/BotonFlotanteRegresar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useFetchProjects } from '../hooks/useFetchProjects';
import { api } from '../helpers/variablesGlobales';
import { Dialog } from 'primereact/dialog';
import { Player } from '@lottiefiles/react-lottie-player';

/// COMPONETE ///
const CamposProyectoPage = () => {

  const [showDialog, setShowDialog] = useState(false);

  const { userAuth, setUserAuth, dataCrearProyecto } = useAuth();
  // console.log(dataCrearProyecto.tipo.name)

  // Función que mantiene el estado del usuario al hacer refesh
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserAuth(foundUser);
      // console.log(foundUser)
    }
  }, []);

  const navigate = useNavigate();

   // Context del formulario crear proyecto
   const example = useContext(ExampleContex);

  // Context del archivo excel
  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);
  // console.log(dataArchivoExcel)

  const handleDragEnd =(event) => {
    const {active, over} = event

    const oldIndex = dataArchivoExcel.findIndex(element => element.id === active.id); 
    const newIndex = dataArchivoExcel.findIndex(element => element.id === over.id);

    const newOrder = arrayMove(dataArchivoExcel, oldIndex, newIndex);

    setDataArchivoExcel(newOrder)
    console.log(newOrder)
  }

  const onSubmit = () => {

      fetch(`${api}/crear/proyecto/${dataCrearProyecto.proyecto}/${dataCrearProyecto.tipo.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dataArchivoExcel) 
      })
        .then(response => response.json())
        .then(responseData => {
          // Lógica adicional después de enviar los datos a la API
          // ...
          console.log('Respuesta de la API:', responseData);
          setShowDialog(true);
        })
        .catch(error => console.log(error));

        setShowDialog(true);
  }; 

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate('/proyectos'); // Redireccionar a la página de proyectos
  };

  const handleClickRegresar = () => {
    // Acciones a realizar cuando se hace clic en el botón flotante izquierdo
    navigate('/proyectos');
  };

  return (
    <>
      <h1 className="pt-6 pb-8 pl-4 text-4xl font-black">Campos proyecto: { <span className='text-[#245A95]'>{example.dataCrearProyecto.proyecto}</span> }</h1>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className='lg:w-8/12 lg:h-11/12 mx-auto bg-white shadow-lg p-8'>
          <div className='drop-shadow-lg flex flex-auto flex-col px-4 md:mx-10 md:px-5'>
              <SortableContext
                items={dataArchivoExcel}
                strategy={verticalListSortingStrategy}
              >
                {
                  dataArchivoExcel.map((item, index) => (
                    <AcordionCampos key={item.id} data={item} dataArchivoExcel={dataArchivoExcel} index={index} setDataArchivoExcel={setDataArchivoExcel}/>
                  ))          
                }
              </SortableContext>
            </div>
          </div>
      </DndContext>
      <BotonFlotanteGuardar onClick={onSubmit} />
      <BotonFlotanteRegresar onClick={handleClickRegresar} />

      <Dialog
          visible={showDialog}
          onHide={() => setShowDialog(false)}
          footer={<button onClick={handleDialogClose} className="ml-auto object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-sm font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4" >Cerrar</button>}
        >
          <p className="text-3xl font-black pb-10">Proyecto guardado exitosamente</p>
          <Player src='https://lottie.host/da9fce7b-d61d-4dd2-adff-7f9cffae9bd0/AQpy3VS18s.json'
            className="player"
            loop
            autoplay
            style={{ height: '150px', width: '150px' }}
          />
      </Dialog> 

      {/* <Dialog visible={showDialog} onHide={() => setShowDialog(false)}>
        <h2>Proyecto guardado correctamente</h2>
      </Dialog> */}
    </>
  )
}

export default CamposProyectoPage