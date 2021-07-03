import React, { useState, useEffect } from 'react'
import Pokedex from 'pokedex-promise-v2';
import { Lethargy } from 'lethargy';
import { useWheel } from 'react-use-gesture'; // use useGesture later to include drag?
import Pokeball from './images/pokeball.svg'

var p = new Pokedex();  // change to const later?
var lethargy = new Lethargy()

function SinnohDexView(props) {
    return (
        <div className={'split left'}>
            <div className={'centered'}>
                <img src={`https://play.pokemonshowdown.com/sprites/xyani/${props.name}.gif`}/>
            </div>
        </div>
    )
}

function SinnohDexScroller({entries, entry, setEntry, restProps}) {
    const [pokemon, setPokemon] = useState(null);

    const slides = (entries) ? entries.map(x => x.pokemon_species.name.toUpperCase()) : null
    const clamp = (value, min, max) => Math.max(Math.min(max, value), min) // stay in bounds

    const bind = useWheel(({ event, last, memo: wait = false }) => {
        if (!last) {
            const s = lethargy.check(event);
            if (s) {
                if (!wait) {
                    setEntry((i) => clamp(i - s, 0, slides.length - 1));
                    return true;
                }
            } else return false
        } else {
            return false
        }
    })

    const formatEntry = (number) => {
        var len = Math.log(number) * Math.LOG10E + 1 | 0;
        console.log(`${len}`)
        if (len === 1) {
            return '00' + number;
        } else if (len === 2) {
            return '0' + number;
        } else {
            return number;
        }
    }

    if (slides) {
        return (
            <div className={'split right'} {...bind()}>
                <div className="slider" style={{ transform: `translateY(${-entry * 22.5}vh)` }}>
                    {slides.map((i, index) => (
                    <div key={i} className='cell'>
                        <img src={Pokeball}/>
                        <div className='entry-number'>{formatEntry(index+1)}</div>
                        {i}
                    </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return <div>LOADING!</div>
    }
    
    }

function SinnohDex() {
    const [entries, setEntries] = useState(null);
    const [entry, setEntry] = useState(0);

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

    const testClick = () => {
        //console.log(entries.map(x => x.pokemon_species.name));  //test

        if (entry < entries.length-1) {
            setEntry(entry+1);
        } else {
            setEntry(0);
        }
        
        console.log(`Current entry is ${entry}`);
    }
/*
    const testWheel = (e) => {
        if (entry < entries.length-1) {
            if (e.deltaY > 0) {
                setEntry(entry+1);
            } else if (entry !== 0) {
                setEntry(entry-1);
            }
        } else {
            setEntry(0);
        }
    }
*/
    const getName = (name) => {
        /* HOTFIX: PokeAPI names don't always match with Pokemon Showdown assets */
        if (name === "mr-mime") {
            return "mrmime";
        } else if (name === "mime-jr") {
            return "mimejr";
        } else {
            return name;
        }
    } 

    return entries ? (
        <div onClick={testClick}
             
        >
             
            <SinnohDexView name={getName(entries[entry].pokemon_species.name)}/>
            <SinnohDexScroller 
                entries={entries} 
                entry={entry}
                setEntry={setEntry} 
            />
        </div>
    ) : <div>loading</div> 
}

export default SinnohDex;

/*
----------------------- NOTES -------------------------------
1. cycle thru pokedex on click
2. Create scroll wheel component that displays names
    X DRAGGING 
        X useDrag
        XX no more dragging, we will use a custom sidebar
    - WHEELING
        - useWheel and Lethargy library
    !! sync the pokemon sprites with scrolling of menu
    !! pass entries down as props to scroll
3. Make Pokemon Entry
    - stats, nature, etc

----------------------- PROPS -------------------------------
name: name of game

----------------------- SCRATCH -------------------------------
SinnohDexScroller
    props: pokedex entries
    will be an animated list 


SinnohDexEntry
    info: weight of pokemon
          height of pokemon
          back/front sprite.png
          stats
            A pokemon can have many stat combos, we choose whatever is first in API response

    
*/