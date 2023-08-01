export const getProjectClient = async (api, clienteSeleccionado) =>{

    const url =`${api}/obtener/proyectos/cliente`;
    const options = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(clienteSeleccionado)
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