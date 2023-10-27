import { Dialog } from 'primereact/dialog'
import React from 'react'

export const ModalTextoImagenes = ({modalTextoImagenesSate, setModalTextoImagenesSate, selectedActivities, selectedActivityIndex, textoActividadesState}) => {

    const selectedActivity = selectedActivities[selectedActivityIndex];
    const textoRelacionado = textoActividadesState.find(item => item[selectedActivity]);

// Ahora, textoRelacionado contendrá el objeto que tiene la propiedad buscada.
// Puedes acceder al texto relacionado de la siguiente manera:
const texto = textoRelacionado ? textoRelacionado[selectedActivity] : 'Texto no encontrado'; 
  return (
    <Dialog header='Texto de imagenes' visible={modalTextoImagenesSate} style={{ width: '90vw'}} onHide={() => setModalTextoImagenesSate(false)}>
        <div className='grid grid-cols-2'>
            <div>
                <h1 className="pl-3 text-4xl font-black text-[#245A95]">{selectedActivities[selectedActivityIndex]?.replace(/_/g, ' ')}</h1>
                <p>Este es un texto sugerido para la actividad seleccionada, puedes copiarlo y pegarlo en el campo Texto de imagenes.</p>
                <p className="text-center text-3xl pt-6">
                    <ion-icon name="arrow-forward"></ion-icon>
                </p>
            </div>
            <p>{texto}</p>
        </div>
    </Dialog>
  )
}
