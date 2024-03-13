import { useState, useContext, createContext,useEffect } from "react";

const LcContext = createContext();

const LcProvider = ({children}) =>{
    const [lc,setLc] = useState({
        solved: 0,
        calendar: []
    });
    useEffect(()=>{
        let existingLcItem = localStorage.getItem('lc');
        if(existingLcItem) setLc(JSON.parse(existingLcItem))
    },[])
    return (
        <LcContext.Provider value={[lc,setLc]}>
            {children}
        </LcContext.Provider>
    )
}

// custom hook

const useLc = ()=> useContext(LcContext);
export {useLc, LcProvider}