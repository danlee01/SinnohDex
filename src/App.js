import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

import Pagination from './components/Pagination';
import Posts from './components/Posts';

import Pokedex from 'pokedex-promise-v2';
import { ConsoleWriter } from 'istanbul-lib-report';
const p = new Pokedex();

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
 
  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemons = [];
      setLoading(true);
      const pokedex = await p.getPokedexByName('original-sinnoh');
      const names = pokedex.pokemon_entries.map(pokemon => (pokemon.pokemon_species.name == 'wormadam') ? 'wormadam-plant' :  pokemon.pokemon_species.name);
      for (let name of names) {
        const pokemon = await p.getPokemonByName(name);
        pokemons.push(pokemon);
      }
      setPosts(pokemons);
      setLoading(false);
    }
    fetchPokemon();
  }, [])

  // Get current posts
   const indexOFLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOFLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOFLastPost);

   // Change page
   const paginate = (page) => { setCurrentPage(page) };

  return (
    <div className="container text-center">
      <h1>SinnohDex</h1>
        <Posts posts={currentPosts} loading={loading} indexOfFirst={indexOfFirstPost}/>
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />
      <div className="footer">Made with ❤️ in React</div>
    </div>
  );
}

export default App;
