import { Player } from '@lottiefiles/react-lottie-player'
import { Dialog } from 'primereact/dialog'
import React from 'react'

const DialogUsuarioOContrasenaInvalidos = ({dialogUsuarioContraseña, setDialogUsuarioContraseña}) => {
  return (
    <Dialog header='Usuario o contraseña invalidos' visible={dialogUsuarioContraseña} style={{ width: '35vw', zIndex: 1 }} onHide={() => setDialogUsuarioContraseña(false)}>
        <div className='text-center'>
            <Player src='https://lottie.host/f26125d9-a8f9-4afb-be93-0f3fef4c962e/yNK4E8mryJ.json'
              className="player"
              loop
              autoplay
              style={{ height: '350px', width: '350px' }}
            />
            
        </div>
        
        <div className=''>
            <button 
                type='submit'
                onClick={() => setDialogUsuarioContraseña(false)}
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

export default DialogUsuarioOContrasenaInvalidos