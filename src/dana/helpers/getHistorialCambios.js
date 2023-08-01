export const getHistorialCambios = async (api, proyectoSeleccionado) =>{

    const url =`${api}/obtener/historial/registro`;
    const options = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(proyectoSeleccionado)
    };

    const data = await fetch(url, options).then((resp)=>{
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