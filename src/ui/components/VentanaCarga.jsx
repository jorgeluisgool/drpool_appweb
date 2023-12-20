import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

export const VentanaCarga = ({mensaje}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-screen h-screen flex items-center justify-center">
          <Player
            src="https://lottie.host/6e504b56-2da0-430e-9861-0a2186e4ae0f/hkIjXR28gA.json"
            className="player absolute bottom-0 w-full"
            loop
            autoplay
            speed={0.2}
            style={{ width: '100%', zIndex: -1 }} // Ajusta el zIndex a un valor negativo para que se vea por debajo
          />
          <div className="hidden lg:flex h-full w-full items-center justify-center" style={{ flexDirection: 'column' }}>
            <div className="w-auto h-auto mx-auto">
              <img className="" src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62" alt="Your Company"/>
              <h1 className='animate-pulse text-3xl text-black pt-6'>Guardando...<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></h1>
              <h1 className='text-3xl text-black pt-6 font-semibold'>{mensaje}</h1>
            </div>  
          </div>
        </div>
    </div>
  )
}
