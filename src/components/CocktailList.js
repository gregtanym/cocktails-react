import React from 'react';
import Loading from './Loading';
import Cocktail from './Cocktail';
import { useGlobalContext } from '../context';

const CocktailList = () => {
    // we need the state with the list of cocktails
    const { cocktails, loading } = useGlobalContext()

    if(loading){
        return(
            <Loading/>
        )
    }
    if(cocktails.length <1){
        return(
            <h2 className='section-title'>no cocktails match your search criteria</h2>
        )
    }

    return (
        <section className='section'>
            <h2 className='section-title'>
                cocktails
            </h2>
            <div className='cocktails-center'>
                {cocktails.map((item) => {
                    // what is this ...item to get all the props?? i thought is have to pass it in individually?
                    // return <Cocktail key={item.id} {...item}/>
                    return <Cocktail key={item.id} item={item}/>
                }
                )}
            </div>
        </section>
    )
}

export default CocktailList
