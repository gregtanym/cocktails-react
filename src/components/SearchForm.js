import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
// uncontrolled input

const SearchForm = () => {
    // we need the function that changes the state based on our search
    const {setSearchTerm} = useGlobalContext()
    const searchValue = useRef('')

    const searchCocktail = () => {
        setSearchTerm(searchValue.current.value)
    }

    useEffect(() => searchValue.current.focus(), [])

    // prevent page refresh on pressing enter
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <section className='section search'>
            <form className='search-form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Search your favourite cocktail</label>
                    {/* on every input stroke we would want to update the setsearchterm state, to do that we are using the onchange method */}
                    <input type='text' id='name' ref={searchValue} onChange={searchCocktail}/>
                </div>
            </form>
        </section>
    )
}

export default SearchForm
