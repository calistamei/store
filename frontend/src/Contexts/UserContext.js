import { useState, createContext } from "react";

export const UserContext = createContext({})

export function PassContext( {children }) {
    const [category, setCategory] = useState(0)

    return(
        <UserContext.Provider value={{category, setCategory}}>
            {children}
        </UserContext.Provider>
    )
}