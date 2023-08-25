import React from 'react'
import { FormLogin } from '../components/FormLogin'
import { Player } from "@lottiefiles/react-lottie-player";
import rueditaLogo from '../../assets/isae.png';
import logoIsae from '../../assets/logo_ISAe.png';

export const LoginPage = () => {
  return (
    <>
    <div className='flex w-full h-screen'>
       <Player
          src='https://lottie.host/62737a3a-99fd-455d-873b-0fca3846dd34/Q81rP342PE.json'
          className="player absolute bottom-0 w-full"
          loop
          autoplay
          speed={0.3}
          style={{ marginLeft: '50%', width: '50%', height: '100%', zIndex: -1 }} // Ajusta el zIndex a un valor negativo para que se vea por debajo
        />
      <div className='flex w-full items-center justify-center lg:w-1/2 bg-white'>
        <div className="relative">
          <FormLogin />
        </div>
      </div>
      <div className='hidden lg:flex h-full w-1/2 items-center justify-center' style={{ flexDirection: 'column' }}>
        <div className='w-auto h-auto mx-auto motion-safe:animate-spin'>
          <img className="" src={rueditaLogo} alt="Your Company"/>
        </div>
        <h1 className='text-white text-lg font-black pt-20'>Powered by</h1>
        <img className="h-10" src={logoIsae} alt="Your Company"/>
      </div>
    </div>
    
    </>
  )
}
