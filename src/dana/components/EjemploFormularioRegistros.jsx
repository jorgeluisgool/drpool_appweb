import React from 'react';
import { Formik, Form, Field } from 'formik';

const data =  {
    "listaAgrupaciones": [
        {
            "idAgrupacion": 26,
            "agrupacion": "DATOS DEL REGISTRO",
            "idInventario": 148404,
            "campos": [
                {
                    "idCampo": 3081,
                    "agrupacion": "DATOS DEL REGISTRO",
                    "nombreCampo": "FOLIO",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "ALFANUMERICO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 100,
                    "valor": "c.alejandromarquez-DEMO-3",
                    "pordefecto": ""
                }
            ]
        },
        {
            "idAgrupacion": 18,
            "agrupacion": "INFORMACION",
            "idInventario": 148404,
            "campos": [
                {
                    "idCampo": 3082,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "NOMBRE",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "ALFABETICO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "PRUEBA",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3083,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "DIRECCION",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "ALFANUMERICO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "PTUEBA",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3084,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "EMAIL",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CORREO",
                    "restriccion": "[\\.]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "correo@mail.com",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3085,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "TELEFONO",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "NUMERICO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "1234567890",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3086,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "AREA",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CATALOGO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 100,
                    "valor": "TECNICOS",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3087,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "ESTADO",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CATALOGO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 100,
                    "valor": "CHIAPAS",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3088,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "EVIDENCIA",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "FOTO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "JDHDBD",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3089,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "FECHA",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CALENDARIO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "07/06/2023",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3090,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "HORA ",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "HORA",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "13:13",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3091,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "INFORMACION VALIDA ",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CHECKBOX",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "TRUE",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3092,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "FOTOS DEMO",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CHECKBOX-EVIDENCIA",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "TRUE",
                    "pordefecto": ""
                },
                {
                    "idCampo": 3093,
                    "agrupacion": "INFORMACION",
                    "nombreCampo": "CODIGO DE BARRAS ",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "CODIGO",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 50,
                    "valor": "WEFG",
                    "pordefecto": ""
                }
            ]
        },
        {
            "idAgrupacion": 3,
            "agrupacion": "FIRMAS",
            "idInventario": 148404,
            "campos": [
                {
                    "idCampo": 3094,
                    "agrupacion": "FIRMAS",
                    "nombreCampo": "FIRMA",
                    "validarduplicidad": "FALSE",
                    "tipoCampo": "FIRMA",
                    "restriccion": "[N/A]",
                    "editable": "TRUE",
                    "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                    "longitud": 100,
                    "valor": "",
                    "pordefecto": ""
                }
            ]
        }
    ],
    "catalogos": {
        "ESTADO": {
            "tipoCatalogo": "ESTADO",
            "proyecto": {
                "idproyecto": 185,
                "fechacreacion": "2023-05-17",
                "proyecto": "DEMO",
                "target": "0",
                "tipoproyecto": {
                    "idtipo": 4,
                    "descripcion": "OTROS"
                },
                "folioautomatico": "FALSE"
            },
            "catalogo": [
                "TAMAULIPAS",
                "OAXACA",
                "CHIAPAS",
                "PUEBLA",
                "GUERRERO"
            ]
        },
        "AREA": {
            "tipoCatalogo": "AREA",
            "proyecto": {
                "idproyecto": 185,
                "fechacreacion": "2023-05-17",
                "proyecto": "DEMO",
                "target": "0",
                "tipoproyecto": {
                    "idtipo": 4,
                    "descripcion": "OTROS"
                },
                "folioautomatico": "FALSE"
            },
            "catalogo": [
                "SISTEMAS",
                "DOCUMENTACION",
                "TECNICOS"
            ]
        },
        "EVIDENCIA": {
            "tipoCatalogo": null,
            "proyecto": null,
            "catalogo": null
        }
    },
    "respuestaCheckbox": [
        "INFORMACION VALIDA "
    ],
    "listaCamposBusqueda": [],
    "respuestaFirmas": [
        {
            "idfirma": 141,
            "nombrefirma": "FIRMA",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FFirmas%2FFIRMA?alt=media&token=FIRMA.png",
            "camposProyecto": {
                "idcamposproyecto": 3094,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "FIRMA",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 100,
                "pattern": "[N/A]",
                "tipocampo": "FIRMA",
                "agrupacion": {
                    "idagrupacion": 3,
                    "agrupacion": "FIRMAS"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            }
        }
    ],
    "respuestaFotos": [
        {
            "idfoto": 179099,
            "nombrefoto": "EVIDENCIA",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FEvidencias%2FEVIDENCIA?alt=media&token=EVIDENCIA.png",
            "coordenadas": "",
            "usuario": {
                "idusuario": 5,
                "correo": "c.alejandromarquez@gmail.com",
                "jefeinmediato": "superadmin",
                "nombre": "Carlos Alejandro Marquez Martinez",
                "pass": "isae54321",
                "passtemp": 1,
                "telefono": "5576215087",
                "ubicacion": "CIUDAD-DE-MEXICO",
                "usuario": "c.alejandromarquez",
                "token": "",
                "perfile": {
                    "idperfil": 1,
                    "perfil": "Super Admin"
                }
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            },
            "campoProyecto": {
                "idcamposproyecto": 3088,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "EVIDENCIA",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 50,
                "pattern": "[N/A]",
                "tipocampo": "FOTO",
                "agrupacion": {
                    "idagrupacion": 18,
                    "agrupacion": "INFORMACION"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            }
        }
    ],
    "respuestaCheckboxEvidencia": [
        {
            "idfoto": 179099,
            "nombrefoto": "EVIDENCIA",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FEvidencias%2FEVIDENCIA?alt=media&token=EVIDENCIA.png",
            "coordenadas": "",
            "usuario": {
                "idusuario": 5,
                "correo": "c.alejandromarquez@gmail.com",
                "jefeinmediato": "superadmin",
                "nombre": "Carlos Alejandro Marquez Martinez",
                "pass": "isae54321",
                "passtemp": 1,
                "telefono": "5576215087",
                "ubicacion": "CIUDAD-DE-MEXICO",
                "usuario": "c.alejandromarquez",
                "token": "",
                "perfile": {
                    "idperfil": 1,
                    "perfil": "Super Admin"
                }
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            },
            "campoProyecto": {
                "idcamposproyecto": 3088,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "EVIDENCIA",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 50,
                "pattern": "[N/A]",
                "tipocampo": "FOTO",
                "agrupacion": {
                    "idagrupacion": 18,
                    "agrupacion": "INFORMACION"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            }
        },
        {
            "idfoto": 179100,
            "nombrefoto": "QWRWT",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FEvidencias%2FQWRWT?alt=media&token=QWRWT.png",
            "coordenadas": "",
            "usuario": {
                "idusuario": 5,
                "correo": "c.alejandromarquez@gmail.com",
                "jefeinmediato": "superadmin",
                "nombre": "Carlos Alejandro Marquez Martinez",
                "pass": "isae54321",
                "passtemp": 1,
                "telefono": "5576215087",
                "ubicacion": "CIUDAD-DE-MEXICO",
                "usuario": "c.alejandromarquez",
                "token": "",
                "perfile": {
                    "idperfil": 1,
                    "perfil": "Super Admin"
                }
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            },
            "campoProyecto": {
                "idcamposproyecto": 3092,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "FOTOS DEMO",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 50,
                "pattern": "[N/A]",
                "tipocampo": "CHECKBOX-EVIDENCIA",
                "agrupacion": {
                    "idagrupacion": 18,
                    "agrupacion": "INFORMACION"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            }
        },
        {
            "idfoto": 179101,
            "nombrefoto": "HWHD",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FEvidencias%2FHWHD?alt=media&token=HWHD.png",
            "coordenadas": "",
            "usuario": {
                "idusuario": 5,
                "correo": "c.alejandromarquez@gmail.com",
                "jefeinmediato": "superadmin",
                "nombre": "Carlos Alejandro Marquez Martinez",
                "pass": "isae54321",
                "passtemp": 1,
                "telefono": "5576215087",
                "ubicacion": "CIUDAD-DE-MEXICO",
                "usuario": "c.alejandromarquez",
                "token": "",
                "perfile": {
                    "idperfil": 1,
                    "perfil": "Super Admin"
                }
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            },
            "campoProyecto": {
                "idcamposproyecto": 3092,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "FOTOS DEMO",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 50,
                "pattern": "[N/A]",
                "tipocampo": "CHECKBOX-EVIDENCIA",
                "agrupacion": {
                    "idagrupacion": 18,
                    "agrupacion": "INFORMACION"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            }
        },
        {
            "idfoto": 179102,
            "nombrefoto": "YWHDD",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FEvidencias%2FYWHDD?alt=media&token=YWHDD.png",
            "coordenadas": "",
            "usuario": {
                "idusuario": 5,
                "correo": "c.alejandromarquez@gmail.com",
                "jefeinmediato": "superadmin",
                "nombre": "Carlos Alejandro Marquez Martinez",
                "pass": "isae54321",
                "passtemp": 1,
                "telefono": "5576215087",
                "ubicacion": "CIUDAD-DE-MEXICO",
                "usuario": "c.alejandromarquez",
                "token": "",
                "perfile": {
                    "idperfil": 1,
                    "perfil": "Super Admin"
                }
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            },
            "campoProyecto": {
                "idcamposproyecto": 3092,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "FOTOS DEMO",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 50,
                "pattern": "[N/A]",
                "tipocampo": "CHECKBOX-EVIDENCIA",
                "agrupacion": {
                    "idagrupacion": 18,
                    "agrupacion": "INFORMACION"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            }
        },
        {
            "idfoto": 179103,
            "nombrefoto": "BDBDBD",
            "url": "https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Proyectos%2F185-DEMO%2F148404-c.alejandromarquez-DEMO-3%2FEvidencias%2FBDBDBD?alt=media&token=BDBDBD.png",
            "coordenadas": "",
            "usuario": {
                "idusuario": 5,
                "correo": "c.alejandromarquez@gmail.com",
                "jefeinmediato": "superadmin",
                "nombre": "Carlos Alejandro Marquez Martinez",
                "pass": "isae54321",
                "passtemp": 1,
                "telefono": "5576215087",
                "ubicacion": "CIUDAD-DE-MEXICO",
                "usuario": "c.alejandromarquez",
                "token": "",
                "perfile": {
                    "idperfil": 1,
                    "perfil": "Super Admin"
                }
            },
            "inventario": {
                "idinventario": 148404,
                "fechacreacion": "2023-06-07",
                "folio": "c.alejandromarquez-DEMO-3",
                "estatus": "CERRADO",
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                }
            },
            "campoProyecto": {
                "idcamposproyecto": 3092,
                "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
                "campo": "FOTOS DEMO",
                "validarduplicidad": "FALSE",
                "editable": "TRUE",
                "longitud": 50,
                "pattern": "[N/A]",
                "tipocampo": "CHECKBOX-EVIDENCIA",
                "agrupacion": {
                    "idagrupacion": 18,
                    "agrupacion": "INFORMACION"
                },
                "proyecto": {
                    "idproyecto": 185,
                    "fechacreacion": "2023-05-17",
                    "proyecto": "DEMO",
                    "target": "0",
                    "tipoproyecto": {
                        "idtipo": 4,
                        "descripcion": "OTROS"
                    },
                    "folioautomatico": "FALSE"
                },
                "pordefecto": ""
            }
        }
    ]
  } 

const EjemploFormularioRegistros = () => {

    const handleSubmit = (values) => {
        const newData = { ...data };

        newData.listaAgrupaciones.forEach((agrupacion) => {
          agrupacion.campos.forEach((campo) => {
            if (values.hasOwnProperty(campo.nombreCampo)) {
              campo.valor = values[campo.nombreCampo];
            }
          });
        });

        console.log(newData);
      };

  return (
    <>
        <div>EjemploFormularioRegistros </div>

        <Formik initialValues={{}} onSubmit={handleSubmit}>
      <Form>
        {data.listaAgrupaciones.map((agrupacion, indexAgrup) => (
          <div key={agrupacion.idAgrupacion}>
            <h2>{agrupacion.agrupacion}</h2>
            {agrupacion.campos.map((campo, indexCamp) => (
              <div key={campo.idCampo}>
                <label htmlFor={campo.nombreCampo}>{campo.nombreCampo}</label>
                {campo.tipoCampo === 'ALFANUMERICO' && (
                  <Field type="text" name={campo.nombreCampo} defaultValue={campo.valor} />
                )}
                {campo.tipoCampo === 'ALFABETICO' && (
                  <Field type="text" name={campo.nombreCampo} defaultValue={campo.valor} />
                )}
                {campo.tipoCampo === 'CORREO' && (
                  <Field type="email" name={campo.nombreCampo} defaultValue={campo.valor} />
                )}
                {campo.tipoCampo === 'NUMERICO' && (
                  <Field type="number" name={campo.nombreCampo} defaultValue={campo.valor} />
                )}
                {campo.tipoCampo === 'CATALOGO' && (
                  <Field as="select" name={campo.nombreCampo} defaultValue={campo.valor}>
                    {data.catalogos[campo.nombreCampo].catalogo.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                )}
                {/* Añade aquí los demás tipos de campo */}
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
    </>
  )
}

export default EjemploFormularioRegistros