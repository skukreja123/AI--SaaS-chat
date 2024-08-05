import axios from "axios"


export const loginUser = async(email:string, password:string)=>{
    const res = await axios.post("/user/login",{email,password});

    if(res.status != 200)
    {
        throw new Error("Unable to login")
    }
    const data =   await res.data;

    return data;
    
}


export const checkAuthstatus = async()=>{
    const res = await axios.get("/user/auth-status");

    if(res.status != 200)
    {
        throw new Error("Unable to authenicate")
    }
    const data =   await res.data;

    return data;
    
}