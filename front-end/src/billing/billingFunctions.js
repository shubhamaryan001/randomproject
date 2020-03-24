export const list = (patientId, token)=>{
    return fetch(`http://localhost:8080/billing/get/${patientId}`,{ 
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

export const pay = (billId, token)=>{
    return fetch(`http://localhost:8080/billing/pay/${billId}`,{ 
        method:"PUT",
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

