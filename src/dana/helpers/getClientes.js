export const getProyectos = async (api)=>{
    const url = `${api}/obtener/clientes/usuario/`;
    const options = {
        method: "GET",
        cache: "no-cache",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
    }
    const resp = await fetch(url,options);
    const data = await resp.json();
    // console.log(data);

    return data;
}