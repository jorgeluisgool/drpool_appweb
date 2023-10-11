import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'

const ModalSeleccionImagenesReporMensual = ({modalSeleccionImagenes, setModalSeleccionImagenes, imagenesActivdades, selectedActivity, selectedImages, setSelectedImages}) => {   

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
    // Aquí puedes guardar las imágenes seleccionadas donde lo necesites
    // Por ejemplo, podrías guardarlas en un estado de tu componente principal
    // o realizar una acción específica, como enviarlas a un servidor.
    console.log('Imágenes seleccionadas:', selectedImages);
  };

  return (
    <Dialog header={`IMAGENES: ${selectedActivity}`} visible={modalSeleccionImagenes}  baseZIndex={-1} style={{ width: '80vw', height: '40vw' }} onHide={() => setModalSeleccionImagenes(false)} className='pt-20'>
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
                <div className="text-base font-medium mb-2 text-white">{imagen.nombrefoto}</div>
              </div>
            </div>
          </div>
        ))
      }
      </div>
      <button onClick={handleSaveImages} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transform transition duration-500 ease-in-out hover:scale-110">
    Guardar Imágenes Seleccionadas
  </button>
    </Dialog>
  )
}

export default ModalSeleccionImagenesReporMensual