export const getUsuarios = async (api) =>{

    const url =`${api}/obtener/usuarios`;
    const options = {
        method: "GET",
        cache: "no-cache",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        // body: JSON.stringify(user)
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