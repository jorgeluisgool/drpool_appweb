import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { api } from '../helpers/variablesGlobales'
import { Dropdown } from 'primereact/dropdown'
import { DialogConfirmacion } from '../../ui/components/DialogConfirmacion'
import useAuth from '../hooks/useAuth'

const opcionesStatus = [
  { label: 'ACTIVO', value: 'ACTIVO' },
  { label: 'INACTIVO', value: 'INACTIVO' }
];

const opcionesEstados = [
  { label: 'CDMX', value: 'CDMX' },
  { label: 'QUERÉTARO', value: 'QUERÉTARO' },
  { label: 'PUEBLA', value: 'PUEBLA' },
  { label: 'GUERRERO', value: 'GUERRERO' },
  { label: 'VERACRUZ', value: 'VERACRUZ' },
  { label: 'TABASCO', value: 'TABASCO' },
];

export const CrearSedeForm = ({dialogNuevaSedeForm, setDialogNuevaSedeForm, setVentanaCarga, setModalRegistroGuardado, setSedeSeleccionada, sedeSeleccionada, clientes, listaUsuarios, sedes}) => {

  console.log(listaUsuarios)
  const { userAuth: usuarioLogiado, setUserAuth } = useAuth();

  const [nombreSede, setNombreSede] = useState('NUEVA SEDE')
  const [editFields, setEditFields] = useState(true);
  const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);
  
  const [coordinadorValue, setCoordinadorValue] = useState(sedeSeleccionada);

  // console.log(listaUsuarios)
  // console.log(sedes)

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
    coordinador: {
      //nombre: coordinadorValue
    },
    cliente: {

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

  const renderClienteOption = (option) => {
    return (
      <div className="flex items-center">
        <img src={option.urllogo} alt={option.cliente} className="mr-2" style={{ width: '40px' }} />
        <span>{option.cliente}</span>
      </div>
    );
  };

  const renderAsignacionOperador = (option) => {
    return (
      <div className="flex items-center">
        <span>{option.nombre}</span> <span className='ml-2 text-green-600'>{option?.asignacion}</span>
      </div>
    );
  };

  // console.log(sedeSeleccionada)

  function usuarioEstaAsignado(usuario, sedes) {
    // Verificar si el usuario está asignado a alguna sede
    return sedes.some((sede) => sede.operador.idusuario === usuario.idusuario);
  }
  
  return (
    <Dialog header='Sede' visible={dialogNuevaSedeForm} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => {setDialogNuevaSedeForm(false); setEditFields(true)}} className='pt-16'>
        <Formik 
          initialValues={sedeSeleccionada === undefined?  initialValues : sedeSeleccionada} 
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};

            if (!values.nombre) {
              errors.nombre = 'Este campo es obligatorio';
            }
            if (!values.encargadosede) {
              errors.encargadosede = 'Este campo es obligatorio';
            }
            if (!values.direccion || !values.direccion.alcaldia) {
              errors.direccion = {
                ...errors.direccion,
                alcaldia: 'La alcaldía es obligatoria',
              };
            }
            if (!values.cliente || Object.keys(values.cliente).length === 0) {
              errors.cliente = 'Es obligatorio seleccionar un cliente';
            }
            if (!values.coordinador || Object.keys(values.coordinador).length === 0) {
              errors.coordinador = 'Es obligatorio seleccionar un coordinador';
            }
            if (!values.operador || Object.keys(values.operador).length === 0) {
              errors.operador = 'Es obligatorio seleccionar un operador';
            }

            return errors
          }}
        >
        {({ values, handleChange }) => (
            <Form> 
              {/* {console.log(values)} */}
              <div className='bg-[#E2E2E2] p-2 rounded-xl mb-2'>
                <h1 className='text-2xl font-semibold'>Datos generales</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
                  <div className="p-inputgroup mb-5 mt-8 relative">
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
                      <div className="absolute left-2 mt-14">
                        <ErrorMessage name="nombre" component="div" className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce"/>
                      </div>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8 relative">
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
                      <div className="absolute left-2 mt-14">
                        <ErrorMessage name="encargadosede" component="div" className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce"/>
                      </div>
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
                              as={Dropdown}
                              name="direccion.estado"
                              value={values.direccion.estado.toUpperCase()}
                              options={opcionesEstados} 
                              optionLabel="label"
                              filter
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
                  <div className="p-inputgroup mb-5 mt-8 relative">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={InputText}
                              name="direccion.alcaldia"
                              value={values.direccion.alcaldia.toUpperCase()}
                              disabled ={
                                sedeSeleccionada != undefined &&
                                editFields}
                              required
                          /> 
                          <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                            <i className="pi pi-file-edit text-[#245A95] font-bold text-2xl"></i>
                          </span>
                          <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                            Alcaldía o municipio *
                          </label>
                      </span>
                      <div className="absolute left-2 mt-14">
                        <ErrorMessage
                          name="direccion.alcaldia"
                          render={(msg) => (
                            <div className="flex items-center">
                              <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                                <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                              </div>
                            </div>
                          )}
                        />
                      </div>
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
                  <div className="p-inputgroup mb-5 mt-8 relative">
                      <span className='p-float-label relative'>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="cliente"
                              value={values.cliente}
                              options={clientes.filter(cliente => cliente.estatus === "ACTIVO")} 
                              optionLabel="cliente"
                              itemTemplate={renderClienteOption}
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
                      <div className="absolute left-2 mt-14">
                        <ErrorMessage
                          name="cliente"
                          render={(msg) => (
                            <div className="flex items-center">
                              <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                                <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                              </div>
                            </div>
                          )}
                        />
                      </div>
                  </div>
                  <div className="p-inputgroup mb-5 mt-8 relative">
                    {/* {console.log(values.coordinador)}
                    {console.log(sedeSeleccionada)} */}

                      <span className='p-float-label relative'> 
                        <div className="absolute left-100 top-100 pl-3 pt-3">
                      <p >{values.coordinador.nombre}</p>
                        </div>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="coordinador"
                              value={values.coordinador}
                              options={listaUsuarios.filter(coordinador => (coordinador.perfile.perfil === "COORDINADOR" && coordinador.status === 'ACTIVO'))} 
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
                      <div className="absolute left-2 mt-14">
                        <ErrorMessage
                          name="coordinador"
                          render={(msg) => (
                            <div className="flex items-center">
                              <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                                <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                              </div>
                            </div>
                          )}
                        />
                      </div>
                  </div>
                  
                  <div className="p-inputgroup mb-5 mt-8 relative">
                      <span className='p-float-label relative'>
                      <div className="absolute left-100 top-100 pl-3 pt-3">
                          <p >{values.operador.nombre}</p>
                        </div>
                          <Field
                              className="w-full appearance-none focus:outline-none"
                              as={Dropdown}
                              name="operador"
                              value={values.operador}
                              options={listaUsuarios
                                .filter((usuario) => usuario.perfile.perfil === "OPERADOR")
                              }
                              itemTemplate={renderAsignacionOperador}
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
                            Operador de la sede *
                          </label>
                      </span>
                      <div className="absolute left-2 mt-14">
                        <ErrorMessage
                          name="operador"
                          render={(msg) => (
                            <div className="flex items-center">
                              <div className="text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md animate-bounce">
                                <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                              </div>
                            </div>
                          )}
                        />
                      </div>
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
                {/* {
                  usuarioLogiado[0]?.perfile.perfil === 'SUBDIRECTOR' ?  */}
                  <>
                    <button
                        type="button"
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => setModaAceptarlAbrirCerrar(true)}
                    >
                      <ion-icon name="save"></ion-icon> Guardar
                    </button>
                    {sedeSeleccionada != undefined && usuarioLogiado[0].perfile.perfil != 'COORDINADOR'? (
                        <button
                            className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                            onClick={() => {                           
                                setEditFields(!editFields);
                            }}
                            type='button'
                        >
                            {editFields ? <p> <ion-icon name="create"></ion-icon> Editar</p> :  <p> <ion-icon name="alert-circle"></ion-icon> No editar</p>}
                        </button>
                      ): <></>
                    }
                    <button
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => {
                          setDialogNuevaSedeForm(false);
                        }}
                        type='button'
                    >
                        Cancelar
                    </button>
                  </>
                  {/* : <></> */}
                {/* }         */}
                {modaAceptarlAbrirCerrar ?
                <DialogConfirmacion modaAceptarlAbrirCerrar = {modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields ={setEditFields}/> : <></>}    
              </div> 
            </Form>
        )}
        </Formik>
    </Dialog> 
  )
}
