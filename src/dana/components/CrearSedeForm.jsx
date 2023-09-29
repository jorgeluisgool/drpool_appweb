import { Field, Form, Formik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { api } from '../helpers/variablesGlobales'
import { Dropdown } from 'primereact/dropdown'
import { DialogConfirmacion } from '../../ui/components/DialogConfirmacion'

const opcionesStatus = [
  { label: 'ACTIVO', value: 'ACTIVO' },
  { label: 'INACTIVO', value: 'INACTIVO' }
];

export const CrearSedeForm = ({dialogNuevaSedeForm, setDialogNuevaSedeForm, setVentanaCarga, setModalRegistroGuardado, setSedeSeleccionada, sedeSeleccionada, clientes, listaUsuarios}) => {

  const [nombreSede, setNombreSede] = useState('NUEVA SEDE')
  const [editFields, setEditFields] = useState(true);
  const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);

  const initialValues = {
    nombre: '', 
    encargadosede: '',
    direccion: {
      iddireccion: 0,
      calle: '',
      callenumero: '',
      estado: '',
      alcaldia: '', 
      colonia: '',
      codigopostal: '',
    },
    telefono: '',
    correo: '',
    cliente: {

    },
    coordinador: {
      
    },
    operador: {

    },
    estatus: 'ACTIVO'
  };


  const onSubmit = (values, { resetForm }) => {
      // console.log(values);
      values.nombre = values.nombre.toUpperCase()
      values.encargadosede = values.encargadosede.toUpperCase()
      values.direccion.calle = values.direccion.calle.toUpperCase()
      values.direccion.estado = values.direccion.estado.toUpperCase()
      values.direccion.alcaldia = values.direccion.alcaldia.toUpperCase()
      values.direccion.colonia = values.direccion.colonia.toUpperCase()
      

      console.log(values);
       setVentanaCarga(true);
  
        fetch(`${api}/nueva/sede`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.text())
          .then((responseData) => {
            setVentanaCarga(false);
            setModalRegistroGuardado(true);
            setDialogNuevaSedeForm(false);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  console.log(sedeSeleccionada)

  return (
    <Dialog header='Sede' visible={dialogNuevaSedeForm} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => {setDialogNuevaSedeForm(false); setEditFields(true)}} className='pt-16'>
        <Formik initialValues={sedeSeleccionada === undefined?  initialValues : sedeSeleccionada} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form> 
              <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                <h1 className='text-2xl font-semibold'>Datos generales</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="nombre"
                              value={values.nombre.toUpperCase()}
                              onChange={(e) => {
                                handleChange(e);
                                setNombreSede(e.target.value.toUpperCase());
                              }}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                              required
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Nombre de la sede *
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="encargadosede"
                              value={values.encargadosede.toUpperCase()}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                              required
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Administrador de la sede *
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="correo"
                              value={values.correo}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            E-mail del administrador de la sede
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="telefono"
                              value={values.telefono}
                              keyfilter="pint"
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                              // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Teléfono del administrador de la sede
                          </label>
                      </span>
                  </div>
                </div>
              </div> 
              <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                <h1 className='text-2xl font-semibold'>Dirección de la sede</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.calle"
                              value={values.direccion.calle.toUpperCase()}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Calle
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.callenumero"
                              value={values.direccion.callenumero}
                              keyfilter="pint"
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            N° calle
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.estado"
                              value={values.direccion.estado.toUpperCase()}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Estado
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.alcaldia"
                              value={values.direccion.alcaldia.toUpperCase()}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Alcaldía o municipio *
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.colonia"
                              value={values.direccion.colonia.toUpperCase()}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Colonia
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.codigopostal"
                              value={values.direccion.codigopostal}
                              keyfilter="pint"
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Código postal
                          </label>
                      </span>
                  </div>
                </div>
              </div>
              <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                <h1 className='text-2xl font-semibold'>Relaciones y estatus</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="cliente"
                              value={values.cliente}
                              options={clientes.filter(cliente => cliente.estatus === "ACTIVO")} 
                              optionLabel="cliente"
                              filter
                              required
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Cliente al que pertenece *
                          </label>
                      </span>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'> 
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="coordinador"
                              value={values.coordinador}
                              options={listaUsuarios.filter((usuario) => usuario.perfile.perfil === "COORDINADOR")} 
                              optionLabel="nombre"
                              filter
                              required
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Coordinador de la sede *
                          </label>
                      </span>
                      <p>{values.coordinador.nombre}</p>
                  </div>
                  
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="operador"
                              value={values.operador}
                              options={listaUsuarios.filter((usuario) => usuario.perfile.perfil === "OPERADOR")} 
                              optionLabel="nombre"
                              filter
                              required
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                              // onChange={(e) => setFieldValue("proyecto", e.target.value.toUpperCase())}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Operador de la sede *
                          </label>
                      </span>
                      <p>{values.operador.nombre}</p>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="estatus"
                              value={values.estatus}
                              options={opcionesStatus} 
                              optionLabel="value"
                              required
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Estatus *
                          </label>
                      </span>
                  </div>
                </div>
              </div> 
              <div className="cursor-pointer absolute inset-x-0 bottom-4 right-12 flex gap-3 justify-end">
              <button
                            type="button"
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => setModaAceptarlAbrirCerrar(true)}
                        >
                          <ion-icon name="save"></ion-icon> Guardar
                        </button>
                        
                        {modaAceptarlAbrirCerrar ?
                         <DialogConfirmacion modaAceptarlAbrirCerrar = {modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields ={setEditFields}/> : <></>}
                  {sedeSeleccionada != undefined ? (<button
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => {
                              
                                setEditFields(!editFields);
                            }}
                            type='button'
                        >
                            {editFields ? <p> <ion-icon name="create"></ion-icon> Editar</p> :  <p> <ion-icon name="alert-circle"></ion-icon> No editar</p>}
                        </button>
                    ): <></>}
                  <button
                      className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                      onClick={() => {
                        setDialogNuevaSedeForm(false);
                      }}
                      type='button'
                  >
                      Cancelar
                  </button>
              </div> 
            </Form>
        )}
        </Formik>
    </Dialog> 
  )
}


// ENCARGADO SEDE
// DATOS DE CONTACTO