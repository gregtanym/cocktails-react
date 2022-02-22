import React, { useContext, useEffect, useState, useCallback } from 'react';

// link to the api/db that we are working with 
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext();

const AppProvider = ({children}) => {

    // loading is to show the loading animation if the page is still loading
    const [loading, setLoading] = useState(true)
    // state to keep track of the user input into the search bar
    const [searchTerm, setSearchTerm] = useState('a')
    // state to store the list of cocktails that match the search input
    const [cocktails, setCocktails] = useState([])

    const fetchDrinks = useCallback(async () =>{
        setLoading(true)
        const response = await fetch(`${url}${searchTerm}`)
        const data =  await response.json()
        const {drinks} = data
        // data is an object with a drinks property and a corresponding array of drinks or null if no drinks

        if(drinks){
            // map over each element in the array to generate a new object for each element to create a new array of objects
            const newCocktails = drinks.map((drink) => {
                const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = drink
                return {
                    // return one new object per drink in drinks
                    id: idDrink,
                    name: strDrink,
                    image: strDrinkThumb,
                    info: strAlcoholic,
                    glass: strGlass

                }
            })
            // edit cocktail array so that other components can access it too
            setCocktails(newCocktails)
        }
        else{
            setCocktails([])
        }
        setLoading(false)
    }, [searchTerm])

    // call useeffect to run the function everytime my searchterm changes
    useEffect(() => {
        fetchDrinks()
        }, [searchTerm, fetchDrinks])

    return (
        <AppContext.Provider value={{
            loading, cocktails,
            setSearchTerm
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }