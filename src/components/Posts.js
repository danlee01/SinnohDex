import React, { useState, useEffect } from 'react';

const Posts = ({ posts, loading, indexOfFirst }) => {
    const getName = (name) => {
        /* HOTFIX: PokeAPI names don't always match with Pokemon Showdown assets */
        if (name === "mr-mime") {
            return "mrmime";
        } else if (name === "mime-jr") {
            return "mimejr";
        } else if (name === "wormadam-plant"){
            return "wormadam";
        } else {
            return name;
        }
    };

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
    };

    const getTypes = (types) => {
        const resArray = types.map( type => type.type.name );
        return resArray.join(', ');
    };

    if (loading) {
        return <h1>Loading...</h1>
    }
    console.log(posts)
    return (
        <div className="posts-container">
            <ul id="pokedex">
                {posts.map((post, i) => (
                    <li key={i} className="pokemon">
                        <img className="pokemon-image" src={`https://play.pokemonshowdown.com/sprites/xyani/${getName(post.name)}.gif`}/>
                        <h2 className="pokemon-title">{getName(post.name)}</h2>
                        <p className="pokemon-subtitle">{getTypes(post.types)}</p>
                        <h3 className="pokemon-number">{formatEntry(indexOfFirst+1+i)}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Posts