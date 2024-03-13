import { useState, useContext, createContext,useEffect } from "react";

const ForcesContext = createContext();

const ForcesProvider = ({children}) =>{
    const [forces,setForces] = useState([]);
    useEffect(()=>{
        let existingForcesItem = localStorage.getItem('forces');
        if(existingForcesItem) setForces(JSON.parse(existingForcesItem))
    },[])
    return (
        <ForcesContext.Provider value={[forces,setForces]}>
            {children}
        </ForcesContext.Provider>
    )
}

// custom hook

const useForces = ()=> useContext(ForcesContext);
export {useForces, ForcesProvider}