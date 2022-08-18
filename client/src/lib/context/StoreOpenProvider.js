import { createContext, useState, useContext, useEffect } from "react";
import { get_AllDates } from "../api";

const StoreContext = createContext()


export function useStoreOpen() {
    return useContext(StoreContext)
}


function StoreOpenProvider({ children }) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        get_AllDates(_id)
            .then(data => {
                if (data.length > 0) {
                    setOpen(true)
                }
            })
    })

    return (

        <StoreContext.Provider value={open}>
            {children}
        </StoreContext.Provider>

    )
}

export default StoreOpenProvider