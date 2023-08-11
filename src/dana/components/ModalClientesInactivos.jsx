import { Dialog } from 'primereact/dialog'
import React from 'react'
import { Link } from 'react-router-dom'

const ModalClientesInactivos = ({dialogClientesInactivos, setDialogClientesInactivos, clientes, setDialogEditatarClienteForm, converImageUrlToFile, setClienteState}) => {

    const clientesInactivos = clientes.filter(cliente => cliente.estatus === "INACTIVO");

  return (
    <>
    <Dialog header='Clientes inactivos' visible={dialogClientesInactivos} style={{ width: '90vw', height: '40vw' }} onHide={() => setDialogClientesInactivos(false)}>
        <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 m-4'> 
            {
              clientesInactivos.map((cliente, index) => (
                <Link key={index} onClick={() => {setClienteState(cliente), setDialogEditatarClienteForm(true), converImageUrlToFile(cliente.urllogo)}}>
                  <div className="max-w-xs overflow-hidden rounded-lg shadow-lg w-full bg-white hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="px-2 py-1 bg-[#E2E2E2] text-center">
                      <div className="font-bold text-sm xl:text-sm mb-2 text-[#245A95]">{cliente.cliente}</div>
                    </div>
                    <div className="relative" style={{ height: '100px' }}>
                      {cliente.urllogo ? (
                        <img
                          className="absolute inset-0 w-full h-full object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-75"
                          src={cliente.urllogo}
                          alt="Random image"
                        />
                      ) : (
                        <div className="flex items-center justify-center absolute inset-0 w-full h-full text-[#245A95] font-bold text-3xl">
                          {cliente.cliente}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>

    </Dialog>
    </>
  )
}

export default ModalClientesInactivos