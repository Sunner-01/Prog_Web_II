const deleteData=()=>{
    fetch(`${API_URL}/1`,{
        method: 'DELETE',
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`)
        }
       showResult({
        message:"el post con id 1 ha sido eliminado",
        status:response.status
        });
       }).catch(error=>showResult(error.message.true))
};