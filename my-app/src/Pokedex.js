import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Typography,
    TextField
} from '@material-ui/core';
import { toFirstCharUppercase } from "./constants";
import SearchIcon from '@material-ui/icons/Search'
import { alpha, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto',
    },
    cardContent: {
        textAlign: 'center',
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: alpha (theme.palette.common.white,0.15),
        paddingLeft: '20px',
        paddingRight:'20px',
        marginTop:'5px',
        marginBottom:'5px',
    },
    searchIcon:{
        alignSelf : 'flex-end',
        marginBottom:'5px',
    }

}));


const Pokedex = props => {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=964`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${index + 1}.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    const getPokemonCard = (pokemonId) => {

        const { id, name, sprite } = pokemonData[pokemonId];


        return (
            <Grid item xs={2} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField className={classes.searchInput} />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map((pokemonId) =>
                        getPokemonCard(pokemonId)
                    )}
                </Grid>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};

export default Pokedex;