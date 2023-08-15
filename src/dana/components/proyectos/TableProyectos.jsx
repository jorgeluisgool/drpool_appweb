import React from 'react'

export const TableProyectos = () => {
  return (
    <>
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-[#245A95] text-white uppercase">
                <tr className='text-left'>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center pl-12">
                            <span>Nombre proyecto</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Cliente al que pertenece</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Sede</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Alberca</span>
                        </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                            <span>Estatus</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200" >
                {/* {currentRows.map((usuario, index) => (
                    <tr
                        key={index}
                        onClick={() => {
                            //Click para mostrar informacion del usuario
                            setUsuarioSeleccionado(usuario);
                            setModalCrearEditarUsuario(true);
                        }}
                        className='cursor-pointer hover:bg-[#E2E2E2]'>
                        <td className="px-6 py-2">
                            <div className="flex items-center">
                                <div className="ml-8">
                                    <div className="text-sm font-medium text-gray-900 cursor-pointer">{usuario.nombre}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{usuario.usuario}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{usuario.correo}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                <div className="text-sm font-medium text-gray-900">{usuario.perfile.perfil}</div>
                            </div>
                        </td>
                        <td className="px-6 py-2">
                            <div className="flex space-x-4">
                                {
                                    usuario.status === 'ACTIVO'?
                                    <div className="text-sm font-medium text-green-600"><ion-icon name="radio-button-on-outline"></ion-icon> {usuario.status}</div>
                                    :
                                    <div className="text-sm font-medium text-red-600"><ion-icon name="radio-button-off-outline"></ion-icon> {usuario.status}</div>
                                }                   
                            </div>
                        </td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    </>
  )
}
