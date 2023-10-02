import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'

const ModalSeleccionImagenesReporMensual = ({modalSeleccionImagenes, setModalSeleccionImagenes}) => {

    

  return (
    <Dialog header='Imagenes' visible={modalSeleccionImagenes} style={{ width: '90vw'}} onHide={() => setModalSeleccionImagenes(false)}>

    </Dialog>
  )
}

export default ModalSeleccionImagenesReporMensual