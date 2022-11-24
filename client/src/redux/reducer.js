import { FILTER_BY_TYPE, 
        FILTER_CREATED, 
        GET_POKEMONS, 
        GET_POKEMON_DETAIL, 
        GET_TYPES, 
        ORDER_BY_NAME,
        ORDER_BY_ATTACK,
        CLEAR_DETAIL,
        FIND_BY_NAME,
        POST_POKEMON,
        DELETE_POKEMON} from "./actions";

const initialState = {
    pokemons: [],
    allPokemons:[],
    detail:{},
    types:[]
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons:action.payload
            }

        case GET_POKEMON_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case POST_POKEMON:
            return{
                ...state
            }
        case FIND_BY_NAME:
            const allPo = [...state.allPokemons]
            const pokemon = allPo.filter((p) => p.name.includes(action.payload))
            return{
                ...state,
                pokemons: pokemon
            }  
        case FILTER_BY_TYPE:
            const allPokemons = [...state.allPokemons]
            const typesFiltered =
                action.payload === "all"
                ? allPokemons
                : allPokemons.filter((p) => p.Types.includes(action.payload));
            return {
                ...state,
                pokemons: typesFiltered,
      };

      case ORDER_BY_NAME:
            const allPokes = [...state.pokemons];
            const sortedPokemon =
                action.payload === "asc"
                ? allPokes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                : allPokes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                pokemons: action.payload === 'all' 
                ? state.allPokemons 
                : sortedPokemon
            };

        case FILTER_CREATED:
            //createdInDb
            const allPoke = [...state.allPokemons]
            const createdFilter = action.payload === 'created' 
            ? allPoke.filter(el=> el.createdInDb) 
            : allPoke.filter(el => !el.createdInDb)
            return{
                ...state,
                pokemons: action.payload === 'all' 
                ? state.allPokemons 
                : createdFilter
            };
        
            case ORDER_BY_ATTACK:
                const allPok = [...state.pokemons];
                const sortedAttack =
                    action.payload === "weak"
                    ? allPok.sort(function (a, b) {
                        if (a.attack > b.attack) {
                            return 1;
                        }
                        if (b.attack > a.attack) {
                            return -1;
                        }
                        return 0;
                    })
                    : allPok.sort(function (a, b) {
                        if (a.attack > b.attack) {
                            return -1;
                        }
                        if (b.attack > a.attack) {
                            return 1;
                        }
                        return 0;
                    });
                return {
                    ...state,
                    pokemons: action.payload === 'all' 
                    ? state.allPokemons 
                    : sortedAttack
                };

                case CLEAR_DETAIL:
                    return{
                        ...state,
                        detail: {}
                    }
                case DELETE_POKEMON:
                    return {
                    ...state,
                    };

        default:
            return{...state}
    }
}

export default rootReducer ;