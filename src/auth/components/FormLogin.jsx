import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../dana/hooks/useAuth';
import { api } from '../../dana/helpers/variablesGlobales';


export const FormLogin = () => {

    const { userAuth, setUserAuth } = useAuth();

    //Hook use Navigate
    const navigate = useNavigate();

    //Estados de los Imput para formulario controlado
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errorUsuario, setErrorUsuario] = useState("");

    // const getUsers = async () => {
    //     try{
    //         const url = "https://www.danae.com.mx:8443/web-0.0.1-SNAPSHOT/obtener/usuario"
    //         const response = await axios.post(url);
    //         console.log(response) 
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const getValidation = async (user) =>{

        const url =`${api}/obtener/usuario`;
        const options = {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(user)
        };
    
        const data = await fetch(url,options).then((resp)=>{
            return resp.json();
        }
        ).catch((resp)=>{
            console.log('Error al ejecutar la consulta', resp);
            return undefined;
        });
        // const resp = await fetch(url,options);
        
        // const data = await resp.json();
        
        return data;
    }

    const onLogin = (e) => {

        localStorage.setItem("token", "true");

        e.preventDefault();
        
        //Validar los datos
        if (
            usuario == "" && contrasena == ""
        ){
            return setErrorUsuario("Todos los campos son obligatorios")
        }else {
            setErrorUsuario("")
        }

        //enviar los datos y Navegar al menu al hacer click
        getValidation({
            usuario: usuario,
            pass: contrasena
        }).then(resp => {
            
            if (resp.length > 0) {
                
                navigate('/menu', {
                    replace: true
                })
                               
            }else{
                console.log("usuario o contraseña incorrectos")
            }
            
            setUserAuth(resp);

            localStorage.setItem('user', JSON.stringify(resp))
        });
    }

  return (
        <>
        <div className='drop-shadow-lg bg-slate-50 px-6 py-12 rounded-3xl border border-[#245A95]'>
            <div className='flex items-center justify-center pb-6'>
                <img src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/LogoClientes%2Flogo-drpool-black.png?alt=media&token=a9161a39-9ed7-472e-af7f-ba8dcd856d62" alt="Your Company" className='h-32'/>
            </div>
            <p className='font-medium text-lg text-gray-500'>Bienvenido de nuevo</p>
            <div className='mt-4'>
                <label className='text-lg text-[#245A95] font-medium'>Usuario</label>
                <form onSubmit={onLogin}>
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <i className="pi pi-user text-[#245A95]"></i>
                        </span>
                        <input 
                            className='w-full border-2 border-gray-100 p-4 mt-1 bg-transparet rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                            type='text'
                            placeholder='Ingrese su Usuario'
                            name='usuario'
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}   
                        />
                    </label>
                    <label className='text-lg text-[#245A95] font-medium'>Contraseña</label>
                        <label className="relative block">
                            <span className="sr-only">Search</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <i className="pi pi-lock text-[#245A95]"></i>
                            </span>
                            <input 
                                className='w-full border-2 border-gray-100 p-4 mt-1 bg-transparet rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                                placeholder='Ingrese su contraseña'
                                type='password'
                                name='contrasena'
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </label>
                        <div className='mt-8 flex flex-col gap-y-4'>
                        {
                            errorUsuario !== "" && 
                            <p className='text-red-700 w-full'>
                                {errorUsuario}
                            </p>
                        }
                            <button 
                            type='submit'
                            className='active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold'

                            >
                                Iniciar sesión
                            </button>
                        </div> 
                    </form>  
                </div>   
        </div>
        </>
  )
}
