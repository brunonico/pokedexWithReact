import React, { useState, useEffect } from "react";
import { toFirstCharUppercase } from "./constants";
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';
const Pokemon = props => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);


    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then (function(response){
                const {data} = response ; 
                setPokemon(data)
            })
            .catch(function (error){
                setPokemon(false);
            })

    },[pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        
        var fullImageUrl = ` https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

        if (id < 10) {
            fullImageUrl = ` https://assets.pokemon.com/assets/cms2/img/pokedex/full/${'00' + id}.png`
        } if (id < 100 && id >= 10) {
            fullImageUrl = ` https://assets.pokemon.com/assets/cms2/img/pokedex/full/${'0' + id}.png`
        } 
        

        return (
            <>
                <Typography variant="h1">
                    {`${id}.`}{toFirstCharUppercase(name)}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`} style={{ width: '120px', height: '120px' }} />
                </Typography>
                <img style={{ width: '500px', height: '500px' }} src={fullImageUrl} />
                <Typography variant="h3">Pokemon info</Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Weight: {weight}</Typography>
                <Typography variant="h6">Types:</Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}>{`${name}`}</Typography>
                })}
            </>
        )
    };
    return (<>
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography> Pokemon not found</Typography>}
        {pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push("/")}>
                Back to pokedex
            </Button>
        )}
    </>);
};

export default Pokemon;