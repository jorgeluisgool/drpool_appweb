import React from 'react'

export const BotonFlotanteRegresar = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 left-4 px-4 ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-[#BE1622] hover:bg-white hover:text-[#BE1622] text-white text-2xl font-black inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4"
      onClick={onClick}
    >
      <ion-icon name="return-up-back"></ion-icon>
    </button>
  )
}
