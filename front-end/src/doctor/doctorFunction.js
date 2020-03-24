export const list = ()=>{
    return fetch("http://localhost:8080/doctors/all",{
        method:"GET"
    })
    .then(response=>{
        return response.json()  
    })
    .catch(err=>console.log(err));
}   