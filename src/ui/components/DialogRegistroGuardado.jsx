import { Dialog } from 'primereact/dialog'
import React, { useEffect } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

export const DialogRegistroGuardado = ({modalRegistroGuardado, setModalRegistroGuardado, dataMensajeRegistroGuardado}) => {

    useEffect(() => {
        if (modalRegistroGuardado) {
          const timer = setTimeout(() => {
            setModalRegistroGuardado(false);
          }, 2400); // 5000 milisegundos = 5 segundos
    
          return () => clearTimeout(timer);
        }
      }, [modalRegistroGuardado]);

  return (
    <Dialog 
        header='MENSAJE' 
        visible={modalRegistroGuardado} 
        style={{
            // position: 'fixed',
            // top: '20px', // Ajusta la distancia desde la parte superior
            // right: '20px', // Ajusta la distancia desde la parte derecha
            width: '350px', // Ajusta el ancho del Dialog
            // height: '300px',
            zIndex: 9999, // Asegúrate de que el zIndex sea superior para que se muestre por encima de otros elementos
            borderRadius: '20px', // Agrega bordes redondeados para un aspecto más agradable
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Agrega una sombra para el efecto de elevación
            backgroundColor: '#ffffff', // Ajusta el color de fondo del Dialog
          }} 
        onHide={() => setModalRegistroGuardado(false)}
    >
        <div className='text-center'>
            <Player src='https://lottie.host/da9fce7b-d61d-4dd2-adff-7f9cffae9bd0/AQpy3VS18s.json'
                className="player"
                loop
                autoplay
                style={{ height: '150px', width: '150px' }}
            />
            <h1 className='text-lg font-bold'>{dataMensajeRegistroGuardado}</h1>
        </div>
        
        <div className='mt-8'>
            <button 
                type='button'
                onClick={() => setModalRegistroGuardado(false)}
                className='hover:shadow-slate-600 border h-7 px-4 bg-[#245A95] text-white text-xs font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600'
            >
                ACEPTAR
            </button>
        </div>
    </Dialog>
  )
}
