import { createContext, useState, useContext, useEffect } from "react";


const StoreContext = createContext()


export function useStoreOpen() {
    return useContext(StoreContext)
}


function StoreOpenProvider({ children }) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        fetch('/api/availability')
            .then((res) => res.json())
            .then((data) => {
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