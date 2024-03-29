import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../dana/hooks/useAuth';
import { ModalSeeleccionarCliente } from '../../dana/components/ModalSeeleccionarCliente';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';

export const Navbar = () => {

  const menu = useRef(null);

  const handleUserOptionClick = () => {
    navigate('/configuracion', {
      replace: true,
    });
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login', {
      replace: true,
    });
  };

    const items = [
        {
            label: 'cliente',
            icon: 'pi pi-user',
            items: [
              {
                label: 'configuraciones',
                icon: 'pi pi-cog',
                command: handleUserOptionClick
              }
            ],
        },
  
        {
            separator: true
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-fw pi-power-off',
            command: onLogout
        }
    ];

  // Context del usuario logiado
  const { userAuth: usuarioLogiado, clientes, setClientes, clienteSeleccionado } = useAuth();

  const logoClienteSeleccionado = clienteSeleccionado.urllogo;
  const [modalSeleccionCliente, setModalSeleccionCliente] = useState(false)

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);


  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  const accept = () => {
    // toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    onLogout();
  };

  const confirm1 = (event) => {
      confirmPopup({
          target: event.currentTarget,
          message: '¿Seguro que desea cerrar sesión?',
          icon: 'pi pi-lock',
          acceptLabel: 'Aceptar',
          rejectLabel: 'Cancelar',
          accept
      });
  };

  return (
    <>
      <div className="z-30 shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-[#245A95] py-2 md:px-6 px-5">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] mt-2">
            <Link to="/menu">
              <div className="p-1 flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl rounded-md hover:bg-sky-600">
                <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
                  <img src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5" alt="Icono" className="h-11 mr-1" />
                </span>
              </div>
            </Link>
          </div>
          <div onClick={() => setOpen(!open)} className="text-4xl absolute right-7 top-3 cursor-pointer text-slate-50 xl:hidden">
            <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
          </div>
          <ul
            ref={navbarRef}
            className={`xl:flex xl:items-center xl:pb-0 pb-2 absolute xl:static bg-[#245A95] xl:z-auto z-[-1] left-24 md:left-96 lg:left-2/3 w-full xl:w-auto pl-3 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-520px]'
              } `}
          >
            {
              logoClienteSeleccionado === undefined ?
                <div onClick={() => setModalSeleccionCliente(true)} className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3 bg-slate-300 cursor-pointer p-2 text-[#245A95] rounded-full">
                  <h1 className='xl:text-center'>Seleccionar un cliente</h1>
                  {/* <img src={logoClienteSeleccionado} alt="Icono" className="h-14 rounded-2xl" /> */}
                </div> :
                (
                  logoClienteSeleccionado === null ?
                    <div onClick={() => setModalSeleccionCliente(true)} className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3 bg-slate-300 rounded-md cursor-pointer p-2 text-[#245A95]">
                      <h1>{clienteSeleccionado.cliente}</h1>
                    </div> : <div onClick={() => setModalSeleccionCliente(true)} className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3 cursor-pointer">
                      <img src={logoClienteSeleccionado} alt="Icono" className="h-14 rounded-2xl" />
                    </div>
                )
            }

            {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/proyectos">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="library-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Proyectos</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR"?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/clientes">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="business-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Clientes, sedes y albercas</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR"?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link 
                    className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" 
                    to="/equipos"
                  >
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="construct-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Equipos</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/usuarios">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="person-add-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Usuarios</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            
            {/* {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/catalogos">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadowxl text-[#245A95] text-3xl">
                        <ion-icon name="clipboard-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Catalogo</p>
                    </div>
                  </Link>
                </li> : <></>
            } */}
            {/* {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/asignaciones">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="accessibility-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Asignaciones</p>
                    </div>
                  </Link>
                </li> : <></>
            } */}
            {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link 
                    className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" 
                    to={clienteSeleccionado.length === 0 ? `/cliente` : `/registros`}
                  >
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="create-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Registros</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/asistencia">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="id-card-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Asistencia</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {/* {
              usuarioLogiado[0]?.perfile.perfil === "SUBDIRECTOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-1 items-center text-[#E2E2E2] rounded-lg text-lg font-semibold hover:text-white" to="/dashboard">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="bar-chart"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1">
                      <p className="text-lg xl:text-center font-semibold">Dashboard</p>
                    </div>
                  </Link>
                </li> : <></>
            } */}
            
            <div className="card flex justify-content-center">
                <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
                <Button 
                  label={<div className="flex items-center space-x-2">
                            <div className="relative w-12 h-12 rounded-full bg-white flex justify-center items-center text-3xl my-auto">
                              <h1 className='text-[#245A95]'>DP</h1>
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                          </div>
                
                
                        }   
                  onClick={(e) => {menu.current.toggle(e), confirm1}} 
                />
            </div>
            {/* Resto de elementos del menú */}
            {/* <button
              className="bg-[#245A95] text-white border border-white hover:bg-white hover:text-[#245A95] shadow-md py-2 px-3 mt-2 rounded-full md:ml-4 duration-500 font-bold"
              // onClick={onLogout}
              onClick={confirm1}
            >
              <i className="pi pi-sign-out"></i>
            </button> */}

            <ConfirmPopup />
            
          </ul>
        </div>
      </div>
      {open && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-20" />}

      {/* Modal para seleccionar un cliente */}
      <ModalSeeleccionarCliente modalSeleccionCliente={modalSeleccionCliente} setModalSeleccionCliente={setModalSeleccionCliente} />
    </>
  )
}
