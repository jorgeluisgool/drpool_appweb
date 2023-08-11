import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../dana/hooks/useAuth';
import { api } from '../../dana/helpers/variablesGlobales';
import { Avatar } from 'primereact/avatar';
import { ModalSeeleccionarCliente } from '../../dana/components/ModalSeeleccionarCliente';

export const Navbar = () => {

  // Context del usuario logiado
  const { userAuth: usuarioLogiado, clientes, setClientes, clienteSeleccionado } = useAuth();
  console.log(clienteSeleccionado);

  const logoClienteSeleccionado = clienteSeleccionado.urllogo;
  const [modalSeleccionCliente, setModalSeleccionCliente] = useState(false)

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login', {
      replace: true,
    });
  };

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

  console.log(clientes);

  return (
    <>

      <div className="z-10 shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-[#245A95] py-2 md:px-6 px-5">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] mt-2">
            <Link to="/menu">
              <div className="p-1 flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl rounded-md hover:bg-sky-600">
                <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
                  <img src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool.png?alt=media&token=83bed173-b243-4bf8-8ad8-3086ad3950d5" alt="Icono" className="h-11 mr-1" />
                </span>
                {/* <img src="/src/assets/letras_isae.png" alt="Icono" className=" h-7 mr-2" /> */}
              </div>
            </Link>
          </div>
          <div onClick={() => setOpen(!open)} className="text-4xl absolute right-7 top-3 cursor-pointer text-slate-50 xl:hidden">
            <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
          </div>
          <ul
            ref={navbarRef}
            className={`xl:flex xl:items-center xl:pb-0 pb-3 pt-1 absolute xl:static bg-[#245A95] xl:z-auto z-[-1] left-40 w-full xl:w-auto xl:pl-0 pl-3 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-520px]'
              } `}
          >
            {
              logoClienteSeleccionado === undefined ?
                <div onClick={() => setModalSeleccionCliente(true)} className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3 bg-slate-300 cursor-pointer p-2 text-[#245A95] rounded-full">
                  <h1>Seleccionar un cliente</h1>
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
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/proyectos">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="library-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Proyectos</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/usuarios">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="person-add-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Usuarios</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/clientes">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="business-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Altas</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadowxl text-[#245A95] text-3xl">
                        <ion-icon name="clipboard-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Catalogo</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="accessibility-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Asignaciones</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/registros">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="create-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Registros</p>
                    </div>
                  </Link>
                </li> : <></>
            }
            {
              usuarioLogiado[0]?.perfile.perfil === "ADMINISTRADOR" || usuarioLogiado[0]?.perfile.perfil === "COORDINADOR" ?
                <li className="nav-item transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl mr-3">
                  <Link className="flex p-2 items-center text-[#E2E2E2] px-0 rounded-lg text-lg font-semibold hover:text-white" to="/">
                    <div className="xl:hidden">
                      <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg drop-shadow-md text-[#245A95] text-3xl">
                        <ion-icon name="id-card-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="xl:ml-1 ml-2">
                      <p className="text-xl font-semibold">Asistencia</p>
                    </div>
                  </Link>
                </li> : <></>
            }

            {/* Resto de elementos del menú */}
            <button
              className="bg-[#245A95] text-white border border-white hover:bg-white hover:text-[#245A95] shadow-md py-2 px-3 mt-2 rounded-full md:ml-4 duration-500 font-bold"
              onClick={onLogout}
            >
              <i className="pi pi-sign-out"></i>
            </button>
          </ul>
        </div>
      </div>
      {open && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-auto" />}

      {/* Modal para seleccionar un cliente */}
      <ModalSeeleccionarCliente modalSeleccionCliente={modalSeleccionCliente} setModalSeleccionCliente={setModalSeleccionCliente} />
    </>
  )
}
