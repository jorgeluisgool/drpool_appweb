import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'

const ModalSeleccionImagenesReporMensual = ({modalSeleccionImagenes, setModalSeleccionImagenes, imagenesActivdades, selectedActivity, selectedImages, setSelectedImages, selectedActivities, selectedActivityIndex, selectedImagesIndex, imagesForActivities, setImagesForActivities}) => {   

  const toggleImageSelection = (imageUrl) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageUrl)) {
        return prevSelectedImages.filter((url) => url !== imageUrl);
      } else {
        return [...prevSelectedImages, imageUrl];
      }
    });
  };

  const handleSaveImages = () => {
    // Obtén el índice seleccionado para determinar la actividad actual
    const activityIndex = selectedActivityIndex;

    // Asegúrate de que imagesForActivities sea un arreglo
    if (!Array.isArray(imagesForActivities)) {
      imagesForActivities = [];
    }

    // Asegúrate de que exista una entrada en imagesForActivities para la actividad actual
  if (!imagesForActivities[activityIndex]) {
    imagesForActivities[activityIndex] = [];
  }

    // Copia el arreglo de imágenes para la actividad actual
    const newImagesForActivity = [...imagesForActivities[activityIndex]];

    // Agrega las imágenes seleccionadas al arreglo
    selectedImages.forEach((imageUrl) => {
      if (!newImagesForActivity.includes(imageUrl)) {
        newImagesForActivity.push(imageUrl);
      }
    });

    // Actualiza el estado imagesForActivities con el nuevo arreglo de imágenes
  setImagesForActivities((prevImages) => {
    const newImages = [...prevImages];
    newImages[activityIndex] = newImagesForActivity;
    return newImages;
  });
    
    // Cierra la ventana modal
    setModalSeleccionImagenes(false);
  };
  
  return (
    <Dialog header={`IMAGENES: ${selectedActivities[selectedActivityIndex]?.replace(/_/g, ' ')}`} visible={modalSeleccionImagenes}  baseZIndex={-1} style={{ width: '80vw', height: '40vw' }} onHide={() => setModalSeleccionImagenes(false)} className='pt-20'>
      <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4'>
      {
        imagenesActivdades.map((imagen) => (
          <div 
            key={imagen.idfoto} 
            className={`relative w-full max-w-md rounded overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer ${selectedImages.includes(imagen.url) ? 'border-4 border-blue-500' : ''}`}
            onClick={() => toggleImageSelection(imagen.url)}
          >
            <div className="relative group">
              <img
                className="w-full h-64 object-cover transform transition duration-500 ease-in-out hover:scale-110"
                src={imagen.url}
                alt="Random image"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-40 py-3 px-6 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex flex-col items-center">
                <div className="text-xs font-light mb-2 text-white">{imagen.nombrefoto}</div>
              </div>
            </div>
          </div>
        ))
      }
      </div>
      <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
        <button onClick={handleSaveImages} className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600">
          Aceptar imágenes seleccionadas
        </button>
      </div> 
    </Dialog>
  )
}

export default ModalSeleccionImagenesReporMensual