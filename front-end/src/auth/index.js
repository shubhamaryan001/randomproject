export const isActive = (history,path)=>{
    if(history.location.pathname=== path) return {color: "#ff9900"};
    else
    return {color:"#ffffff"}
}

export const signout = (next)=>{
    if(typeof window!=="undefined")
    localStorage.removeItem("jwt")
    next()
    return fetch("http://localhost:8080/signOut",{
        method:"GET"
    })
    .then(response=>{
        console.log("Signout",response)
        return response.json()
    })
    .catch(err=> console.log(err));
};

export const isAuthenticated = ()=>{
  if(typeof window=="undefined"){
    return false;
  }
  if(localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"));
  }
  else return false;
}


export const signin = user =>{
  return fetch("http://localhost:8080/signIn",{
      method:"POST",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
  })
  .then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
};



export const authenticate = (jwt,next)=>{
  if(typeof window !== "undefined"){
      localStorage.setItem("jwt",JSON.stringify(jwt))
      next();
  }
}

