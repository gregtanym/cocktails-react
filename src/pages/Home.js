import React from 'react';
import SearchForm from '../components/SearchForm';
import CocktailList from '../components/CocktailList';

// home page to have two components: search bar and the cocktails menu
const Home = () => {
    return (
        <main>
            <SearchForm/>
            <CocktailList/>
        </main>
    )
}

export default Home
