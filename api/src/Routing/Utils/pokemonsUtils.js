const axios = require('axios');
const { Pokemon, Type } = require('../../db');
const axiosInstance = require("../getAxios")

//FUNCIONES PARA GET POKEMONS

//--> POKEMONS API
//--> POKEMONS DB
//--> ALL POKEMONS
const pokemonsApi = async () =>{
    try {
        const infoFirstPage = await axiosInstance.get("https://pokeapi.co/api/v2/pokemon");
        const infoSecondPage = await axiosInstance.get(infoFirstPage.data.next);
        const infoApi = infoFirstPage.data.results.concat(infoSecondPage.data.results);
        
        const infoPokemonsApi = await Promise.all(
            infoApi.map(async (pokemon) => {
                let pokemonDetail = await axiosInstance.get(pokemon.url);
                return {
                    id: pokemonDetail.data.id,
                    name: pokemonDetail.data.name,
                    hp: pokemonDetail.data.stats[0].base_stat,
                    attack: pokemonDetail.data.stats[1].base_stat,
                    defense: pokemonDetail.data.stats[2].base_stat,
                    speed: pokemonDetail.data.stats[5].base_stat,
                    height: pokemonDetail.data.height,
                    weight: pokemonDetail.data.weight,
                    image: pokemonDetail.data.sprites.other.dream_world.front_default,
                    Types: pokemonDetail.data.types.map((t) => t.type.name),
                }
            })
        );
        return infoPokemonsApi;
    } catch (error) {
        return console.log(error)
    }
}

const pokemonsDB = async () =>{
    try {
        const infoDB = (await Pokemon.findAll({
            include :[
                {
                    model:Type,
                    attributes:['name'],
                    through: {attributes:[]}
                }
            ]
        })).map(pokemon => {
            const json = pokemon.toJSON()
            console.log(json)
            return{
                ...json,
                Types:json.Types.map((type)=> type.name)
            }
            
        })
        console.log(infoDB)
        return infoDB;
    } catch (error) {
        return console.log(error)
    }
}

const allPokemons = async () =>{
    const apiData = await pokemonsApi();
    const dbData = await pokemonsDB();

    
    return [...apiData, ...dbData]
}


//BUSQUEDA POR NOMBRE 
//--> BUSQUEDA NAME API
//--> BUSQUEDA NAME DB

//FUNCIONES PARA EL GET ID
//--> BUSQUEDA ID API
//--> BUSQUEDA ID DB

module.exports = {
    pokemonsApi,
    pokemonsDB,
    allPokemons,
    
}