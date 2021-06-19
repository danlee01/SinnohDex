import React, { useState, useEffect } from 'react'
import Pokedex from 'pokedex-promise-v2';

var p = new Pokedex();

function SinnohDexView(props) {
    return (
        <img src={`https://play.pokemonshowdown.com/sprites/xyani/${props.name}.gif`}/>
    )
}

function SinnohDexScroller(props) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        p.getPokemonByName("piplup")
    .then(function(response) {
      console.log(response);
      setPokemon(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
    })

    return <div>testing PokemonByName function!</div>
}

function SinnohDex() {
    const [entries, setEntries] = useState(null);
    const [entry, setEntry] = useState(0)

    useEffect(() => {
        p.getPokedexByName('original-sinnoh') // with Promise
        .then(function(response) {
            console.log(response);
            setEntries(response.pokemon_entries);
        })
        .catch(function(error) {
            console.log('There was an ERROR: ', error);
        });
    }, []);

    const test = () => {
        console.log(entries.length);

        if (entry < entries.length-1) {
            setEntry(entry+1);
        } else {
            setEntry(0);
        }
        
        console.log(`Current entry is ${entry}`);
    }

    const getName = (name) => {
        /* Since PokeAPI names don't always match with Pokemon Showdown assets */
        if (name === "mr-mime") {
            return "mrmime";
        } else if (name === "mime-jr") {
            return "mimejr";
        } else {
            return name;
        }
    } 

    return entries ? (
        <div onClick={test}>
            <SinnohDexView name={getName(entries[entry].pokemon_species.name)}/>
        </div>
    ) : <div>loading</div> 
}

export default SinnohDexScroller;

/*
----------------------- NOTES -------------------------------
1. cycle thru pokedex on click
2. Create scroll wheel component that displays names
    - works with dragging, scrolling

----------------------- PROPS -------------------------------
name: name of game

----------------------- SCRATCH -------------------------------
SinnohDexScroller
    props: name of entry
           index of entry
    
*/