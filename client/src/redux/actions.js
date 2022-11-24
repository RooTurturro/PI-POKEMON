import axios from "axios"
export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const FILTER_CREATED = "FILTER_CREATED"
export const GET_TYPES= "GET_TYPES"
export const ORDER_BY_NAME= "ORDER_BY_NAME"
export const ORDER_BY_ATTACK= "ORDER_BY_ATTACK"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const FIND_BY_NAME = "FIND_BY_NAME"
export const POST_POKEMON = "POST_POKEMON"
export const DELETE_POKEMON = "DELETE_POKEMON"

export function getPokemons(){
    return async function (dispatch){
        const pokemons = await axios.get("http://localhost:3001/pokemons")
            return dispatch({ type: "GET_POKEMONS" , payload: pokemons.data})
}
}

export function getPokemonDetail(id){
    return async function(dispatch){
        const detail = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({type: "GET_POKEMON_DETAIL", payload: detail.data[0]})
    }
}

export function getTypes(){
    return async function(dispatch){
        const types = await axios.get("http://localhost:3001/types")
        return dispatch({type: "GET_TYPES", payload: types.data})
    }
}

export function postPokemon(data){
    return async function (dispatch) {
    const newPokemon = await axios.post("http://localhost:3001/pokemons", data);
    return newPokemon;
  };
}
export function findByName(payload){
    return{
        type: "FIND_BY_NAME",
        payload
    }
}

export function filterByType(payload){
    return{
        type: "FILTER_BY_TYPE",
        payload
    }
}

export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByAttack(payload){
    return{
        type: "ORDER_BY_ATTACK",
        payload
    }
}

export function clearDetail(){
    return{
        type: "CLEAR_DETAIL"
    }
}



export function deletePokemon(id) {
    return async function (dispatch) {
      try {
        await axios.delete(`http://localhost:3001/pokemons/delete/${id}`);
        return dispatch({
          type: GET_POKEMON_DETAIL,
        });
      } catch (error) {
        console.log("No puedo eliminar el pokemon", error);
      }
    };
  }