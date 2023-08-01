import React from 'react'

export const BotonFlotanteGuardar = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 px-4 ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-[#245A95] hover:bg-white hover:text-[#245A95] text-white text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4"
      onClick={onClick}
    >
      <ion-icon name="save"></ion-icon>
    </button>
  )
}
