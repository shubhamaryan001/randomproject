export const read = (doctorId, token)=>{
    return fetch(`http://localhost:8080/doctor/${doctorId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=> console.log(err))
}

export const appointment = (doctorId,token)=>{
    return fetch(`http://localhost:8080/appointment/${doctorId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=> console.log(err))
}