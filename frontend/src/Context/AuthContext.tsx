import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { checkAuthstatus, loginUser } from '../helpers/api.comunication';

type User = {
    name: string;
    email: string;
};

type userAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login : (email:string, password: string)=> Promise<void>;
    signup : (name:string, email:string, password: string)=> Promise<void>;
    logout : () => Promise<void>;
};

const AuthContext = createContext<userAuth | null>(null);

export const AuthProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser] = useState<User | null>(null);

    const [isLoggedIn, setIslogin] = useState(false);


    useEffect(()=>{
        // FETCH USER COOKIE
        async function checkstatus(){
            const data = await checkAuthstatus();
            if(data){
                setUser({email:data.email, name:data.name});
                 setIslogin(true);
            }
        }
        checkstatus();
    },[]);

    const login = async(email:string, password: string) =>{
        const data = await loginUser(email, password);
        if(data)
        {
            setUser({email:data.email, name:data.name});
            setIslogin(true);
        }

    };
    const signup = async(name:string, email:string, password: string)=>{

    };
    const logout = async () =>{

    };

    const Value ={
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>

};


export const useAuth =() => useContext(AuthContext)


