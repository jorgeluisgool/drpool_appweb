import { Player } from '@lottiefiles/react-lottie-player'
import { Dialog } from 'primereact/dialog'
import React from 'react'

export const DialogNombreYaExiste = ({nombreDuplicadoStateModal, setNombreDuplicadoStateModal, mensajeNombreDuplicado}) => {
  return (
    <Dialog header='MENSAJE' visible={nombreDuplicadoStateModal} style={{ width: '35vw', zIndex: 1 }} onHide={() => setNombreDuplicadoStateModal(false)}>
        <div className='text-center'>
            <div className='text-center'>
                <Player src='https://lottie.host/bc551603-94c8-49da-a9a1-77f8f941a635/IPTte6dfGl.json'
                  className="player"
                  loop
                  autoplay
                  style={{ height: '150px', width: '150px' }}
                />

            </div>
            <h1 className='text-base font-bold'>{mensajeNombreDuplicado}</h1>
        </div>
        
        <div className='mt-8'>
            <button 
                type='submit'
                onClick={() => setNombreDuplicadoStateModal(false)}
                className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 mr-4'
            >
                ACEPTAR
            </button>
            {/* <button 
                type='button'
                onClick={() => setModaAceptarlAbrirCerrar(false)}
                className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600'
            >
                CANCELAR
            </button> */}
        </div>
    </Dialog>
  )
}
