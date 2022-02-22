import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const SingleCocktail = () => {
    // useparams gets data from the link which in this case is the id variable we defined in the link in the app.js
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [cocktail, setCocktail] = useState(null)

    useEffect(() => {
        setLoading(true)
        const getCocktail = async () => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
            // data is an array of 1 element
            if(data.drinks) {
                // assigning the value of the drink property to a variable immediately
                // property: newVariable (this variable can be accessed immediately, its basically just giving the property another name)
                // this is similar to the destructuring done in the context.js
                const {
                    strDrink:name, 
                    strDrinkThumb:image, 
                    strAlcoholic: info, 
                    strCategory: category, 
                    strGlass:glass, 
                    strInstructions: instructions,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5
                } = data.drinks[0]
                const ingredients = [
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5
                ]
                // final object to be added to the cocktails state
                const newCocktail = {
                    name,
                    image,
                    info,
                    category,
                    glass,
                    instructions,
                    ingredients
                }
                setCocktail(newCocktail)
                setLoading(false)
            }
            else{
                setCocktail(null)
                setLoading(false)
            }
        }
        getCocktail()
        // as long as you put in a async function, the code does not occur in a chronological order
    }, [id])
    
    if(loading){
        return(
            <Loading />
        )
    }
    if(!cocktail){
        return(<h2 className='section-title'>no cocktail to display</h2>)
    }

    const {name, image, category, info, glass, instructions, ingredients} = cocktail
    return (
        <section className='section cocktail-section'>
            <Link to='/' className='btn btn-primary'>
                Back Home
            </Link>
            <h2 className='section-title'>{name}</h2>
            <div className='drink'>
                <img src={image} alt={name} />
                <div className='drink-info'>
                    <p>
                        <span className='drink-data'>name:</span>{name}
                    </p>
                    <p>
                        <span className='drink-data'>category:</span>{category}
                    </p>
                    <p>
                        <span className='drink-data'>info:</span>{info}
                    </p>
                    <p>
                        <span className='drink-data'>glass:</span>{glass}
                    </p>
                    <p>
                        <span className='drink-data'>instructions:</span>{instructions}
                    </p>
                    <p>
                        <span className='drink-data'>ingredients:</span>
                        {ingredients.map((item, index) => {
                            return item? <span key={index}>{item}</span> : null
                        } )}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SingleCocktail
