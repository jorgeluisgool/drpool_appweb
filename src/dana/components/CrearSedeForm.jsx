import { Field, Form, Formik } from 'formik'
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

  const { userAuth: usuarioLogiado, setUserAuth } = useAuth();

  const [nombreSede, setNombreSede] = useState('NUEVA SEDE')
  const [editFields, setEditFields] = useState(true);
  const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);
  
  const [coordinadorValue, setCoordinadorValue] = useState(sedeSeleccionada);

  console.log(listaUsuarios)
  console.log(sedes)

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
      //  setVentanaCarga(true);
  
      //   fetch(`${api}/nueva/sede`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(values),
      //   })
      //     .then((response) => response.text())
      //     .then((responseData) => {
      //       setVentanaCarga(false);
      //       setModalRegistroGuardado(true);
      //       setDialogNuevaSedeForm(false);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
  };

  console.log(sedeSeleccionada)

  function usuarioEstaAsignado(usuario, sedes) {
    // Verificar si el usuario está asignado a alguna sede
    return sedes.some((sede) => sede.operador.idusuario === usuario.idusuario);
  }
  
  return (
    <Dialog header='Sede' visible={dialogNuevaSedeForm} baseZIndex={-1} style={{ width: '70vw', height: '40vw' }} onHide={() => {setDialogNuevaSedeForm(false); setEditFields(true)}} className='pt-16'>
        <Formik initialValues={sedeSeleccionada === undefined?  initialValues : sedeSeleccionada} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
            <Form> 
              {console.log(values)}
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
                    {console.log(values.coordinador)}
                    {console.log(sedeSeleccionada)}

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
                      
                  </div>
                  
                  <div className="p-inputgroup mb-5 mt-8">
                      <span className='p-float-label relative'>
                      <div className="absolute left-100 top-100 pl-3 pt-3">
                          <p >{values.operador.nombre}</p>
                        </div>
                          <Field
                              className="w-full appearance-none focus:outline-none bg-transparent"
                              as={Dropdown}
                              name="operador"
                              value={values.operador}
                              options={listaUsuarios
                                .filter((usuario) => usuario.perfile.perfil === "OPERADOR" && !usuarioEstaAsignado(usuario, sedes))}
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
                {
                  usuarioLogiado[0]?.perfile.perfil === 'SUBDIRECTOR' ? 
                  <>
                    <button
                        type="button"
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => setModaAceptarlAbrirCerrar(true)}
                    >
                      <ion-icon name="save"></ion-icon> Guardar-
                    </button>
                    {sedeSeleccionada != undefined ? (
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
                  : <></>
                }        
                {modaAceptarlAbrirCerrar ?
                <DialogConfirmacion modaAceptarlAbrirCerrar = {modaAceptarlAbrirCerrar} setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar} setEditFields ={setEditFields}/> : <></>}    
              </div> 
            </Form>
        )}
        </Formik>
    </Dialog> 
  )
}


[
  {
      "idsede": 13,
      "nombre": "DURANGO",
      "direccion": {
          "iddireccion": 14,
          "calle": "CALPULLI,",
          "callenumero": "",
          "estado": "CIUDAD DE MÉXICO",
          "alcaldia": "COYOACÁN",
          "colonia": "ADOLFO RUÍZ CORTÍNEZ",
          "codigopostal": "04630"
      },
      "encargadosede": "DAN GUTIERREZ",
      "telefono": "5565326541",
      "correo": "dan_gut@gmail.com",
      "estatus": "ACTIVO",
      "coordinador": {
          "idusuario": 388,
          "correo": "correo@prueba.com",
          "jefeinmediato": "drpool",
          "nombre": "USUARIO3",
          "pass": "12345",
          "passtemp": 0,
          "telefono": "123456",
          "ubicacion": "CIUDAD DE MEXICO",
          "usuario": "DRPCOORD01",
          "status": "ACTIVO",
          "token": "",
          "fechanacimiento": "12/12/12",
          "fechaingreso": "12/12/12",
          "perfile": {
              "idperfil": 12,
              "perfil": "COORDINADOR"
          },
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          },
          "vistaCliente": {
              "idcliente": 1,
              "cliente": "Cliente",
              "telefono": "12345",
              "direccion": "DIreccion",
              "rfc": "RCF",
              "urllogo": " ",
              "estatus": "INACTIVO",
              "clienteAplicacion": {
                  "idcliente": 2,
                  "cliente": "DrPool",
                  "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
              }
          }
      },
      "operador": {
          "idusuario": 390,
          "correo": "correo@prueba.com",
          "jefeinmediato": "drpool",
          "nombre": "usuario5",
          "pass": "12345",
          "passtemp": 0,
          "telefono": "12345",
          "ubicacion": "CIUDAD DE MEXICO",
          "usuario": "drpopd01",
          "status": "ACTIVO",
          "token": "",
          "fechanacimiento": "12/12/12",
          "fechaingreso": "12/12/12",
          "perfile": {
              "idperfil": 14,
              "perfil": "OPERADOR"
          },
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          },
          "vistaCliente": {
              "idcliente": 1,
              "cliente": "Cliente",
              "telefono": "12345",
              "direccion": "DIreccion",
              "rfc": "RCF",
              "urllogo": " ",
              "estatus": "INACTIVO",
              "clienteAplicacion": {
                  "idcliente": 2,
                  "cliente": "DrPool",
                  "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
              }
          }
      },
      "cliente": {
          "idcliente": 28,
          "cliente": "ALCALDÍA COYOACÁ",
          "telefono": "5565326540",
          "direccion": "AV. FRAY SERVANDO TERESA DE MIER 77, COLONIA CENTRO (ÁREA 1), ALCALDÍA CUAUHTÉMOC, CÓDIGO POSTAL 06000",
          "rfc": "GDF9712054NA",
          "urllogo": "https://firebasestorage.googleapis.com/v0/b/dr-pool-eca1c.appspot.com/o/Clientes%2FALCALD%C3%8DA%20COYOAC%C3%81%2FALCALD%C3%8DA%20COYOAC%C3%81.png?alt=media&token=ALCALDÍACOYOACÁ.png",
          "estatus": "ACTIVO",
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          }
      }
  },
  {
      "idsede": 14,
      "nombre": "NUEVO LEÓN",
      "direccion": {
          "iddireccion": 15,
          "calle": "NUEVO LEON",
          "callenumero": "345",
          "estado": "CIUDAD DE MEXICO",
          "alcaldia": "CUAUHTÉMOC",
          "colonia": "COLONIA",
          "codigopostal": "13456"
      },
      "encargadosede": "JONATHAN RIVAS",
      "telefono": "5452745284",
      "correo": "jonathan.r.drpool@gmail.com",
      "estatus": "ACTIVO",
      "coordinador": {
          "idusuario": 388,
          "correo": "correo@prueba.com",
          "jefeinmediato": "drpool",
          "nombre": "USUARIO3",
          "pass": "12345",
          "passtemp": 0,
          "telefono": "123456",
          "ubicacion": "CIUDAD DE MEXICO",
          "usuario": "DRPCOORD01",
          "status": "ACTIVO",
          "token": "",
          "fechanacimiento": "12/12/12",
          "fechaingreso": "12/12/12",
          "perfile": {
              "idperfil": 12,
              "perfil": "COORDINADOR"
          },
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          },
          "vistaCliente": {
              "idcliente": 1,
              "cliente": "Cliente",
              "telefono": "12345",
              "direccion": "DIreccion",
              "rfc": "RCF",
              "urllogo": " ",
              "estatus": "INACTIVO",
              "clienteAplicacion": {
                  "idcliente": 2,
                  "cliente": "DrPool",
                  "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
              }
          }
      },
      "operador": {
          "idusuario": 390,
          "correo": "correo@prueba.com",
          "jefeinmediato": "drpool",
          "nombre": "usuario5",
          "pass": "12345",
          "passtemp": 0,
          "telefono": "12345",
          "ubicacion": "CIUDAD DE MEXICO",
          "usuario": "drpopd01",
          "status": "ACTIVO",
          "token": "",
          "fechanacimiento": "12/12/12",
          "fechaingreso": "12/12/12",
          "perfile": {
              "idperfil": 14,
              "perfil": "OPERADOR"
          },
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          },
          "vistaCliente": {
              "idcliente": 1,
              "cliente": "Cliente",
              "telefono": "12345",
              "direccion": "DIreccion",
              "rfc": "RCF",
              "urllogo": " ",
              "estatus": "INACTIVO",
              "clienteAplicacion": {
                  "idcliente": 2,
                  "cliente": "DrPool",
                  "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
              }
          }
      },
      "cliente": {
          "idcliente": 29,
          "cliente": "CUAUHTÉMOC",
          "telefono": "5523456890",
          "direccion": "CUAUHTÉMOC-0CDF",
          "rfc": "CU-HVSBFH",
          "urllogo": "https://firebasestorage.googleapis.com/v0/b/dr-pool-eca1c.appspot.com/o/Clientes%2FCUAUHT%C3%89MOC%2FCUAUHT%C3%89MOC.png?alt=media&token=CUAUHTÉMOC.png",
          "estatus": "ACTIVO",
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          }
      }
  },
  {
      "idsede": 15,
      "nombre": "DEPORTIVO PLATEROS",
      "direccion": {
          "iddireccion": 16,
          "calle": "AVENIDA DE LAS ROSAS",
          "callenumero": "24",
          "estado": "CDMX",
          "alcaldia": "ÁLVARO OBREGÓN",
          "colonia": "LA PURÍSIMA",
          "codigopostal": "65321"
      },
      "encargadosede": "MARÍA GONZÁLEZ",
      "telefono": "5563524189",
      "correo": "mary_5678@gmail.com",
      "estatus": "ACTIVO",
      "coordinador": {
          "idusuario": 395,
          "correo": "asiel.manuel@gmail.com",
          "jefeinmediato": "ASIEL MANUEL",
          "nombre": "ASIEL MANUEL",
          "pass": "12345",
          "passtemp": 0,
          "telefono": "5543782210",
          "ubicacion": "CDMX",
          "usuario": "DRPC.ASIEL",
          "status": "ACTIVO",
          "token": "",
          "fechanacimiento": "12/09/23",
          "fechaingreso": "12/09/23",
          "perfile": {
              "idperfil": 12,
              "perfil": "COORDINADOR"
          },
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          },
          "vistaCliente": {
              "idcliente": 1,
              "cliente": "Cliente",
              "telefono": "12345",
              "direccion": "DIreccion",
              "rfc": "RCF",
              "urllogo": " ",
              "estatus": "INACTIVO",
              "clienteAplicacion": {
                  "idcliente": 2,
                  "cliente": "DrPool",
                  "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
              }
          }
      },
      "operador": {
          "idusuario": 390,
          "correo": "correo@prueba.com",
          "jefeinmediato": "drpool",
          "nombre": "usuario5",
          "pass": "12345",
          "passtemp": 0,
          "telefono": "12345",
          "ubicacion": "CIUDAD DE MEXICO",
          "usuario": "drpopd01",
          "status": "ACTIVO",
          "token": "",
          "fechanacimiento": "12/12/12",
          "fechaingreso": "12/12/12",
          "perfile": {
              "idperfil": 14,
              "perfil": "OPERADOR"
          },
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          },
          "vistaCliente": {
              "idcliente": 1,
              "cliente": "Cliente",
              "telefono": "12345",
              "direccion": "DIreccion",
              "rfc": "RCF",
              "urllogo": " ",
              "estatus": "INACTIVO",
              "clienteAplicacion": {
                  "idcliente": 2,
                  "cliente": "DrPool",
                  "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
              }
          }
      },
      "cliente": {
          "idcliente": 30,
          "cliente": "ALCALDÍA ÁLVARO OBREGÓN",
          "telefono": "5565356524",
          "direccion": "AV. FRAY SERVANDO TERESA DE MIER 77, COLONIA CENTRO (ÁREA 1), ALCALDÍA CUAUHTÉMOC, CÓDIGO POSTAL 06000",
          "rfc": "GDF97120",
          "urllogo": "https://firebasestorage.googleapis.com/v0/b/dr-pool-eca1c.appspot.com/o/Clientes%2FALCALD%C3%8DA%20%C3%81LVARO%20OBREG%C3%93N%2FALCALD%C3%8DA%20%C3%81LVARO%20OBREG%C3%93N.png?alt=media&token=ALCALDÍAÁLVAROOBREGÓN.png",
          "estatus": "ACTIVO",
          "clienteAplicacion": {
              "idcliente": 2,
              "cliente": "DrPool",
              "urllogo": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5"
          }
      }
  },
]