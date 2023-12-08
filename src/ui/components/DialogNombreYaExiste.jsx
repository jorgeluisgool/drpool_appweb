import { Dialog } from 'primereact/dialog'
import React from 'react'

export const DialogNombreYaExiste = ({nombreDuplicadoStateModal, setNombreDuplicadoStateModal, mensajeNombreDuplicado}) => {
  return (
    <Dialog header='MENSAJE' visible={nombreDuplicadoStateModal} style={{ width: '35vw', zIndex: 1 }} onHide={() => setNombreDuplicadoStateModal(false)}>
        <div className='text-center'>
            <i className="text-yellow-400 pi pi-exclamation-triangle text-center" style={{ fontSize: '3rem' }}></i>
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
