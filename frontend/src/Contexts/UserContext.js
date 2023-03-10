import { useState, createContext } from "react";

export const UserContext = createContext({})

export function PassContext( {children }) {
    const [selectedCategories, setSelectedCategories] = useState(new Set())
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()

    return(
        <UserContext.Provider value={{selectedCategories, setSelectedCategories, minPrice, setMinPrice, maxPrice, setMaxPrice}}>
            {children}
        </UserContext.Provider>
    )
}