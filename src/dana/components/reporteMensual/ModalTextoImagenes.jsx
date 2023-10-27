import { Dialog } from 'primereact/dialog'
import React, { useRef } from 'react';

export const ModalTextoImagenes = ({modalTextoImagenesSate, setModalTextoImagenesSate, selectedActivities, selectedActivityIndex, textoActividadesState}) => {

    const selectedActivity = selectedActivities[selectedActivityIndex];
    const textoRelacionado = textoActividadesState.find(item => item[selectedActivity]);

    // Ahora, textoRelacionado contendrá el objeto que tiene la propiedad buscada.
    // Puedes acceder al texto relacionado de la siguiente manera:
    const texto = textoRelacionado ? textoRelacionado[selectedActivity] : 'Texto no encontrado, selecciona una actividad para mostrar su texto sugerido'; 

    const textAreaRef = useRef(null);

    const copyToClipboard = () => {
      textAreaRef.current.select();
      document.execCommand('copy');

      setTimeout(() => {
        setModalTextoImagenesSate(false);
      }, 500);
    };

  return (

    <Dialog header="Texto de imágenes" visible={modalTextoImagenesSate} style={{ width: '90vw' }} onHide={() => setModalTextoImagenesSate(false)}>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="pl-3 text-4xl font-black text-[#245A95]">{selectedActivities[selectedActivityIndex]?.replace(/_/g, ' ')}</h1>
          <p>
            Este es un texto sugerido para la actividad seleccionada, puedes copiarlo y pegarlo en el campo Texto de imágenes.
          </p>
          <p className="text-center text-3xl pt-6">
            <ion-icon name="arrow-forward"></ion-icon>
          </p>
        </div>
        <div>
        <textarea
          ref={textAreaRef}
          value={texto}
          readOnly
          className="w-full h-40 p-4 mt-4 bg-gray-100 text-gray-700 border rounded-md shadow-md focus:ring focus:ring-blue-400 transition-transform transform-gpu hover:scale-105 focus:outline-none"
        />

            <button 
                className='hover:shadow-slate-600 border h-10 px-4 mt-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600'
                onClick={copyToClipboard}
            >
                <ion-icon name="document-text-outline"></ion-icon> Copiar al portapapeles
            </button>
        </div>
      </div>
    </Dialog>
    // <Dialog header='Texto de imagenes' visible={modalTextoImagenesSate} style={{ width: '90vw'}} onHide={() => setModalTextoImagenesSate(false)}>
    //     <div className='grid grid-cols-2'>
    //         <div>
    //             <h1 className="pl-3 text-4xl font-black text-[#245A95]">{selectedActivities[selectedActivityIndex]?.replace(/_/g, ' ')}</h1>
    //             <p>Este es un texto sugerido para la actividad seleccionada, puedes copiarlo y pegarlo en el campo Texto de imagenes.</p>
    //             <p className="text-center text-3xl pt-6">
    //                 <ion-icon name="arrow-forward"></ion-icon>
    //             </p>
    //         </div>
    //         <p>{texto}</p>
    //     </div>
    // </Dialog>
  )
}
